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

#ifndef BRILLO8_VM_CONFIG_H
#define BRILLO8_VM_CONFIG_H

#define BRILLO8_LED_RUN 12
#define BRILLO8_LED_FLASH 13

#define BRILLO8_BTN_PUSH 9
#define BRILLO8_BTN_FLASH 8

#define BRILLO8_BTN_IN0  0
#define BRILLO8_BTN_IN1  1
#define BRILLO8_BTN_IN2  2
#define BRILLO8_BTN_IN3  3
#define BRILLO8_BTN_IN4  4
#define BRILLO8_BTN_IN5  5
#define BRILLO8_BTN_IN6  6
#define BRILLO8_BTN_IN7  7

#define BRILLO8_SOFT_SERIAL_RX 10
#define BRILLO8_SOFT_SERIAL_TX 11

#define BRILLO8_DEFAULT_VECTOR_CAPACITY 10
#define BRILLO8_DEFAULT_STACK_SIZE 32

#define BRILLO8_VECTOR_EEPROM_ADDR 0x50

#endif