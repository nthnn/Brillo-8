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
            case PUSH:
                this->stack.push(this->flash[++this->pc]);
                break;

            case POP:
                this->stack.pop();
                break;

            case ADD:       stack_ab(+)
            case SUB:       stack_ab(-)
            case MUL:       stack_ab(*)
            case DIV:       stack_ab(/)
            case REM:       stack_ab(%)
            case POW:       stack_ab(^)
            case AND:       stack_ab(&)
            case OR:        stack_ab(|)
            case SHL:       stack_ab(<<)
            case SHR:       stack_ab(>>)
            case LOG_AND:   stack_ab(&&)
            case LOG_OR:    stack_ab(||)
            case LT:        stack_ab(<)
            case LE:        stack_ab(<=)
            case GT:        stack_ab(>)
            case GE:        stack_ab(>=)
            case EQ:        stack_ab(==)
            case NEQ:       stack_ab(!=)

            case JMP: {
                uint16_t address = this->flash[++this->pc];
                this->pc = address;
                break;
            }

            case IF: {
                fetch_stack(condition);

                if(condition == 0) {
                    uint16_t nestedIfCount = 1;

                    while(nestedIfCount > 0) {
                        this->pc++;

                        if(this->flash[this->pc] == IF)
                            nestedIfCount++;
                        else if(this->flash[this->pc] == ENDIF)
                            nestedIfCount--;
                    }
                }

                break;
            }

            case ENDIF: break;

            case YIELD:
                yield();
                break;

            case RESET:
                reset();
                break;

            case HALT:
                while(1);
                break;

            case PIN_MODE: {
                fetch_stack(value);
                fetch_stack(pin);

                pinMode(pin, value);
                break;
            }

            case DIGITAL_READ:
                this->stack.push(digitalRead(this->flash[++this->pc]));
                break;

            case DIGITAL_WRITE: {
                fetch_stack(value);
                fetch_stack(pin);

                digitalWrite(pin, value);
                break;
            }

            case ANALOG_READ:
                this->stack.push(analogRead(this->flash[++this->pc]));
                break;

            case ANALOG_WRITE: {
                fetch_stack(value);
                fetch_stack(pin);

                analogWrite(pin, value);
                break;
            }

            case ANALOG_REFERENCE:
                analogReference(this->flash[++this->pc]);
                break;

            case PULSE_IN: {
                fetch_stack(timeout);
                fetch_stack(pin);

                this->stack.push(pulseIn(pin, 1, timeout));
                break;
            }

            case PULSE_IN_LONG: {
                fetch_stack(timeout);
                fetch_stack(pin);

                this->stack.push(pulseInLong(pin, 1, timeout));
                break;
            }

            case LOAD:
                this->stack.push(this->flash[this->flash[++this->pc]]);
                break;

            case STORE: {
                uint8_t address = this->flash[++this->pc];
                fetch_stack(value);

                this->flash[address] = value;
                break;
            }

            case DELAY:
                delay(this->stack.top());
                this->stack.pop();

                break;

            case DELAY_MICROSECONDS:
                delayMicroseconds(this->stack.top());
                this->stack.pop();

                break;

            case MILLIS:
                this->stack.push(millis());
                break;

            case MICROS:
                this->stack.push(micros());
                break;

            case SHIFT_IN: {
                fetch_stack(data_pin);
                fetch_stack(clock_pin);
                fetch_stack(bit_order);

                this->stack.push(shiftIn(data_pin, clock_pin, bit_order));
                break;
            }

            case SHIFT_OUT: {
                fetch_stack(data_pin);
                fetch_stack(clock_pin);
                fetch_stack(bit_order);
                fetch_stack(value);

                shiftOut(data_pin, clock_pin, bit_order, value);
                break;
            }

            case TONE: {
                fetch_stack(pin);
                fetch_stack(frequency);

                tone(pin, frequency);
                break;
            }

            case NO_TONE: {
                fetch_stack(pin);
                noTone(pin);

                break;
            }

            case RANDOM:
                this->stack.push(random());
                break;

            case RANDOM_SEED: {
                fetch_stack(seed);
                randomSeed(seed);

                break;
            }

            case I2C_BEGIN:
                Wire.begin(this->flash[++this->pc]);
                break;

            case I2C_END:
                Wire.end();
                break;

            case I2C_REQUEST:
                Wire.requestFrom(Wire.available(), (int) this->flash[++this->pc]);
                break;

            case I2C_AVAILABLE:
                this->stack.push(Wire.available());
                break;

            case I2C_READ:
                this->stack.push(Wire.read());
                break;

            case I2C_WRITE:
                Wire.write(this->stack.top());
                this->stack.pop();

                break;

            case SPI_BEGIN:
                SPI.begin();
                SPI.setBitOrder(this->flash[++this->pc]);

                break;

            case SPI_END:
                SPI.end();
                break;

            case SPI_TRANSFER: {
                fetch_stack(value);
                this->stack.push(SPI.transfer(value));

                break;
            }

            case SPI_BEGIN_TRANSACTION: {
                fetch_stack(data_mode);
                fetch_stack(data_order);
                fetch_stack(speed_max);

                SPI.beginTransaction(SPISettings(speed_max, data_order, data_mode));
                break;
            }

            case SPI_END_TRANSACTION:
                SPI.endTransaction();
                break;

            case SPI_USING_INTERRUPT: {
                fetch_stack(value);
                SPI.usingInterrupt(value);

                break;
            }

            case SOFT_SERIAL_BEGIN:
                this->softSerial.begin(9600);
                break;

            case SOFT_SERIAL_END:
                this->softSerial.end();
                break;

            case SOFT_SERIAL_AVAILABLE:
                this->stack.push(this->softSerial.available());
                break;

            case SOFT_SERIAL_READ:
                this->stack.push(this->softSerial.read());
                break;

            case SOFT_SERIAL_WRITE: {
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