#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>

#include "brillo8_vm_config.h"
#include "brillo8_vm_core.h"
#include "brillo8_vm_stack.hpp"
#include "brillo8_vm_opcodes.h"

void (*reset)(void) = 0;

VirtualMachine::VirtualMachine(FlashProgram flash):
    flash(flash),
    softSerial(BRILLO8_SOFT_SERIAL_RX, BRILLO8_SOFT_SERIAL_TX) { }

void VirtualMachine::execute() {
    while(this->pc < this->flash.size()) {
        uint8_t opcode = this->flash[this->pc];

        switch(opcode) {
            case PUSH: {
                uint8_t value = this->flash[++this->pc];
                this->stack.push(value);
                break;
            }

            case POP:
                this->stack.pop();
                break;

            case ADD: {
                int b = this->stack.top();
                this->stack.pop();
            
                int a = this->stack.top();
                this->stack.pop();
    
                this->stack.push(a + b);
                break;
            }

            case SUB: {
                int b = this->stack.top();
                this->stack.pop();
            
                int a = this->stack.top();
                this->stack.pop();
    
                this->stack.push(a - b);
                break;
            }

            case MUL: {
                int b = this->stack.top();
                this->stack.pop();
            
                int a = this->stack.top();
                this->stack.pop();
    
                this->stack.push(a * b);
                break;
            }

            case DIV: {
                int b = this->stack.top();
                this->stack.pop();
            
                int a = this->stack.top();
                this->stack.pop();
    
                this->stack.push(a / b);
                break;
            }

            case REM: {
                int b = this->stack.top();
                this->stack.pop();
            
                int a = this->stack.top();
                this->stack.pop();
    
                this->stack.push(a % b);
                break;
            }

            case POW: {
                int b = this->stack.top();
                this->stack.pop();
            
                int a = this->stack.top();
                this->stack.pop();
    
                this->stack.push(a ^ b);
                break;
            }

            case AND: {
                int b = this->stack.top();
                this->stack.pop();
                
                int a = this->stack.top();
                this->stack.pop();
            
                this->stack.push(a & b);
                break;
            }

            case OR: {
                int b = this->stack.top();
                this->stack.pop();

                int a = this->stack.top();
                this->stack.pop();
            
                this->stack.push(a | b);
                break;
            }

            case SHL: {
                int b = this->stack.top();
                this->stack.pop();

                int a = this->stack.top();
                this->stack.pop();
    
                this->stack.push(a << b);
                break;
            }

            case SHR: {
                int b = this->stack.top();
                this->stack.pop();

                int a = this->stack.top();
                this->stack.pop();

                this->stack.push(a >> b);
                break;
            }

            case LOG_AND: {
                int b = this->stack.top();
                this->stack.pop();

                int a = this->stack.top();
                this->stack.pop();

                this->stack.push(a && b);
                break;
            }

            case LOG_OR: {
                int b = this->stack.top();
                this->stack.pop();

                int a = this->stack.top();
                this->stack.pop();

                this->stack.push(a || b);
                break;
            }

            case LT: {
                int b = this->stack.top();
                this->stack.pop();

                int a = this->stack.top();
                this->stack.pop();

                this->stack.push(a < b);
                break;
            }

            case LE: {
                int b = this->stack.top();
                this->stack.pop();

                int a = this->stack.top();
                this->stack.pop();

                this->stack.push(a <= b);
                break;
            }

            case GT: {
                int b = this->stack.top();
                this->stack.pop();

                int a = this->stack.top();
                this->stack.pop();

                this->stack.push(a > b);
                break;
            }

            case GE: {
                int b = this->stack.top();
                this->stack.pop();

                int a = this->stack.top();
                this->stack.pop();

                this->stack.push(a >= b);
                break;
            }

            case EQ: {
                int b = this->stack.top();
                this->stack.pop();

                int a = this->stack.top();
                this->stack.pop();

                this->stack.push(a == b);
                break;
            }

            case NEQ: {
                int b = this->stack.top();
                this->stack.pop();

                int a = this->stack.top();
                this->stack.pop();

                this->stack.push(a != b);
                break;
            }

            case JMP:
                this->pc = this->flash[++this->pc];
                break;

            case IF: {
                int condition = this->stack.top();
                this->stack.pop();

                if(condition == 0) {
                    int nestedIfCount = 1;

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
                uint8_t value = this->stack.top();
                this->stack.pop();

                uint8_t pin = this->stack.top();
                this->stack.pop();

                pinMode(pin, value);
                break;
            }

            case DIGITAL_READ: {
                int pin = this->flash[++this->pc], value = digitalRead(pin);            
                this->stack.push(value);

                break;
            }

            case DIGITAL_WRITE: {
                int pin = this->flash[++this->pc], value = this->stack.top();
                this->stack.pop();

                digitalWrite(pin, value);
                break;
            }

            case ANALOG_READ: {
                int pin = this->flash[++this->pc], value = analogRead(pin);
                this->stack.push(value);

                break;
            }

            case ANALOG_WRITE: {
                int pin = this->flash[++this->pc], value = this->stack.top();
                this->stack.pop();

                analogWrite(pin, value);
                break;
            }

            case ANALOG_REFERENCE: {
                int mode = this->flash[++this->pc];
                analogReference(mode);

                break;
            }

            case PULSE_IN: {
                int pin = this->flash[++this->pc], timeout = this->stack.top();
                this->stack.pop();

                int value = pulseIn(pin, 1, timeout);
                this->stack.push(value);

                break;
            }

            case PULSE_IN_LONG: {
                int pin = this->flash[++this->pc], timeout = this->stack.top();
                this->stack.pop();

                int value = pulseInLong(pin, 1, timeout);
                this->stack.push(value);

                break;
            }

            case LOAD: {
                int address = this->flash[++this->pc], value = this->flash[address];
                this->stack.push(value);

                break;
            }

            case STORE: {
                int address = this->flash[++this->pc], value = this->stack.top();
                this->stack.pop();
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
                int dataPin = this->flash[++this->pc];
                int clockPin = this->flash[++this->pc];
                int bitOrder = this->flash[++this->pc];
                int value = shiftIn(dataPin, clockPin, bitOrder);

                this->stack.push(value);
                break;
            }

            case SHIFT_OUT: {
                int dataPin = this->flash[++this->pc];
                int clockPin = this->flash[++this->pc];
                int bitOrder = this->flash[++this->pc];
                int value = this->stack.top();

                this->stack.pop();
                shiftOut(dataPin, clockPin, bitOrder, value);
                break;
            }

            case TONE: {
                int pin = this->flash[++this->pc], frequency = this->flash[++this->pc];
                tone(pin, frequency);

                break;
            }

            case NO_TONE:
                noTone(this->flash[++this->pc]);
                break;

            case RANDOM:
                this->stack.push(random());
                break;

            case RANDOM_SEED:
                randomSeed(this->flash[++this->pc]);
                break;

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
                this->stack.pop();
                Wire.write(this->stack.top());
                break;

            case SPI_BEGIN:
                SPI.begin();
                SPI.setBitOrder(this->flash[++this->pc]);
                break;

            case SPI_END:
                SPI.end();
                break;

            case SPI_TRANSFER: {
                int value = this->stack.top();
                this->stack.pop();

                int result = SPI.transfer(value);
                this->stack.push(result);
                break;
            }

            case SPI_BEGIN_TRANSACTION: {
                int dataMode = this->stack.top();
                this->stack.pop();
    
                int dataOrder = this->stack.top();
                this->stack.pop();
                
                int speedMaximum = this->stack.top();
                this->stack.pop();
        
                SPI.beginTransaction(SPISettings(speedMaximum, dataOrder, dataMode));
                break;
            }

            case SPI_END_TRANSACTION:
                SPI.endTransaction();
                break;

            case SPI_USING_INTERRUPT: {
                int value = this->stack.top();
                this->stack.pop();

                SPI.usingInterrupt(value);
                break;
            }

            case SOFT_SERIAL_BEGIN:
                this->softSerial.begin(this->flash[++this->pc]);
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
                int value = this->stack.top();
                this->stack.pop();

                this->softSerial.write(value);
                break;
            }

            default: break;
        }

        this->pc++;
    }
}