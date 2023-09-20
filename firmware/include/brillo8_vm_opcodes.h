/*
 * This file is part of the Brillo-8 firmware.
 * Copyright (c) 2023 Nathanne Isip
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#ifndef BRILLO8_VM_OPCODES_H
#define BRILLO8_VM_OPCODES_H

enum Brillo8Opcode {
    B8_PUSH,
    B8_POP,

    B8_ADD,
    B8_SUB,
    B8_MUL,
    B8_DIV,
    B8_REM,
    B8_POW,

    B8_AND,
    B8_OR,
    B8_SHL,
    B8_SHR,

    B8_LOG_AND,
    B8_LOG_OR,

    B8_LT,
    B8_LE,
    B8_GT,
    B8_GE,
    B8_EQ,
    B8_NEQ,

    B8_JMP,
    B8_IF,
    B8_ENDIF,
    B8_YIELD,
    B8_RESET,
    B8_HALT,

    B8_PIN_MODE,
    B8_DIGITAL_READ,
    B8_DIGITAL_WRITE,
    B8_ANALOG_READ,
    B8_ANALOG_WRITE,
    B8_ANALOG_REFERENCE,
    B8_PULSE_IN,
    B8_PULSE_IN_LONG,

    B8_LOAD,
    B8_STORE,

    B8_DELAY,
    B8_DELAY_MICROSECONDS,
    B8_MILLIS,
    B8_MICROS,

    B8_SHIFT_IN,
    B8_SHIFT_OUT,

    B8_TONE,
    B8_NO_TONE,

    B8_RANDOM,
    B8_RANDOM_SEED,

    B8_I2C_BEGIN,
    B8_I2C_END,
    B8_I2C_REQUEST,
    B8_I2C_AVAILABLE,
    B8_I2C_READ,
    B8_I2C_WRITE,

    B8_SPI_BEGIN,
    B8_SPI_BEGIN_TRANSACTION,
    B8_SPI_END,
    B8_SPI_END_TRANSACTION,
    B8_SPI_TRANSFER,
    B8_SPI_USING_INTERRUPT,

    B8_SOFT_SERIAL_BEGIN,
    B8_SOFT_SERIAL_END,
    B8_SOFT_SERIAL_AVAILABLE,
    B8_SOFT_SERIAL_READ,
    B8_SOFT_SERIAL_WRITE,

    B8_EOBC
};

#endif