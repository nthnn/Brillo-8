#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>

#include "brillo8_vm_config.h"
#include "brillo8_vm_core.h"
#include "brillo8_vm_stack.hpp"
#include "brillo8_vm_opcodes.h"

void (*reset)(void) = 0;

Brillo8VirtualMachine::Brillo8VirtualMachine(Brillo8FlashProgram flash):
    flash(flash),
    softSerial(BRILLO8_SOFT_SERIAL_RX, BRILLO8_SOFT_SERIAL_TX) { }

void Brillo8VirtualMachine::execute() {
    #define fetch_stack(name) uint8_t name = this->stack.top(); \
                              this->stack.pop()

    #define stack_ab(op) {                                      \
                            fetch_stack(b);                     \
                            fetch_stack(a);                     \
                                                                \
                            this->stack.push(a op b);           \
                            break;                              \
                        }

    while(this->pc < this->flash.size()) {
        uint8_t opcode = this->flash[this->pc];

        switch(opcode) {
            case B8_PUSH:
                this->stack.push(this->flash[++this->pc]);
                break;

            case B8_POP:
                this->stack.pop();
                break;

            case B8_ADD:       stack_ab(+)
            case B8_SUB:       stack_ab(-)
            case B8_MUL:       stack_ab(*)
            case B8_DIV:       stack_ab(/)
            case B8_REM:       stack_ab(%)
            case B8_POW:       stack_ab(^)
            case B8_AND:       stack_ab(&)
            case B8_OR:        stack_ab(|)
            case B8_SHL:       stack_ab(<<)
            case B8_SHR:       stack_ab(>>)
            case B8_LOG_AND:   stack_ab(&&)
            case B8_LOG_OR:    stack_ab(||)
            case B8_LT:        stack_ab(<)
            case B8_LE:        stack_ab(<=)
            case B8_GT:        stack_ab(>)
            case B8_GE:        stack_ab(>=)
            case B8_EQ:        stack_ab(==)
            case B8_NEQ:       stack_ab(!=)

            case B8_JMP: {
                uint16_t address = this->flash[++this->pc];
                this->pc = address;
                break;
            }

            case B8_IF: {
                fetch_stack(condition);

                if(condition == 0) {
                    uint16_t nestedIfCount = 1;

                    while(nestedIfCount > 0) {
                        this->pc++;

                        if(this->flash[this->pc] == B8_IF)
                            nestedIfCount++;
                        else if(this->flash[this->pc] == B8_ENDIF)
                            nestedIfCount--;
                    }
                }

                break;
            }

            case B8_ENDIF: break;

            case B8_YIELD:
                yield();
                break;

            case B8_RESET:
                reset();
                break;

            case B8_HALT:
                while(1);
                break;

            case B8_PIN_MODE: {
                fetch_stack(value);
                fetch_stack(pin);

                pinMode(pin, value);
                break;
            }

            case B8_DIGITAL_READ:
                this->stack.push(digitalRead(this->flash[++this->pc]));
                break;

            case B8_DIGITAL_WRITE: {
                fetch_stack(value);
                fetch_stack(pin);

                digitalWrite(pin, value);
                break;
            }

            case B8_ANALOG_READ:
                this->stack.push(analogRead(this->flash[++this->pc]));
                break;

            case B8_ANALOG_WRITE: {
                fetch_stack(value);
                fetch_stack(pin);

                analogWrite(pin, value);
                break;
            }

            case B8_ANALOG_REFERENCE:
                analogReference(this->flash[++this->pc]);
                break;

            case B8_PULSE_IN: {
                fetch_stack(timeout);
                fetch_stack(pin);

                this->stack.push(pulseIn(pin, 1, timeout));
                break;
            }

            case B8_PULSE_IN_LONG: {
                fetch_stack(timeout);
                fetch_stack(pin);

                this->stack.push(pulseInLong(pin, 1, timeout));
                break;
            }

            case B8_LOAD:
                this->stack.push(this->flash[this->flash[++this->pc]]);
                break;

            case B8_STORE: {
                uint8_t address = this->flash[++this->pc];
                fetch_stack(value);

                this->flash[address] = value;
                break;
            }

            case B8_DELAY:
                delay(this->stack.top());
                this->stack.pop();

                break;

            case B8_DELAY_MICROSECONDS:
                delayMicroseconds(this->stack.top());
                this->stack.pop();

                break;

            case B8_MILLIS:
                this->stack.push(millis());
                break;

            case B8_MICROS:
                this->stack.push(micros());
                break;

            case B8_SHIFT_IN: {
                fetch_stack(data_pin);
                fetch_stack(clock_pin);
                fetch_stack(bit_order);

                this->stack.push(shiftIn(data_pin, clock_pin, bit_order));
                break;
            }

            case B8_SHIFT_OUT: {
                fetch_stack(data_pin);
                fetch_stack(clock_pin);
                fetch_stack(bit_order);
                fetch_stack(value);

                shiftOut(data_pin, clock_pin, bit_order, value);
                break;
            }

            case B8_TONE: {
                fetch_stack(pin);
                fetch_stack(frequency);

                tone(pin, frequency);
                break;
            }

            case B8_NO_TONE: {
                fetch_stack(pin);
                noTone(pin);

                break;
            }

            case B8_RANDOM:
                this->stack.push(random());
                break;

            case B8_RANDOM_SEED: {
                fetch_stack(seed);
                randomSeed(seed);

                break;
            }

            case B8_I2C_BEGIN:
                Wire.begin(this->flash[++this->pc]);
                break;

            case B8_I2C_END:
                Wire.end();
                break;

            case B8_I2C_REQUEST:
                Wire.requestFrom(Wire.available(), (int) this->flash[++this->pc]);
                break;

            case B8_I2C_AVAILABLE:
                this->stack.push(Wire.available());
                break;

            case B8_I2C_READ:
                this->stack.push(Wire.read());
                break;

            case B8_I2C_WRITE:
                Wire.write(this->stack.top());
                this->stack.pop();

                break;

            case B8_SPI_BEGIN:
                SPI.begin();
                SPI.setBitOrder(this->flash[++this->pc]);

                break;

            case B8_SPI_END:
                SPI.end();
                break;

            case B8_SPI_TRANSFER: {
                fetch_stack(value);
                this->stack.push(SPI.transfer(value));

                break;
            }

            case B8_SPI_BEGIN_TRANSACTION: {
                fetch_stack(data_mode);
                fetch_stack(data_order);
                fetch_stack(speed_max);

                SPI.beginTransaction(SPISettings(speed_max, data_order, data_mode));
                break;
            }

            case B8_SPI_END_TRANSACTION:
                SPI.endTransaction();
                break;

            case B8_SPI_USING_INTERRUPT: {
                fetch_stack(value);
                SPI.usingInterrupt(value);

                break;
            }

            case B8_SOFT_SERIAL_BEGIN:
                this->softSerial.begin(9600);
                break;

            case B8_SOFT_SERIAL_END:
                this->softSerial.end();
                break;

            case B8_SOFT_SERIAL_AVAILABLE:
                this->stack.push(this->softSerial.available());
                break;

            case B8_SOFT_SERIAL_READ:
                this->stack.push(this->softSerial.read());
                break;

            case B8_SOFT_SERIAL_WRITE: {
                fetch_stack(value);
                this->softSerial.write(value);

                break;
            }

            default: break;
        }

        this->pc++;
    }

    #undef fetch_stack
    #undef stack_ab
}