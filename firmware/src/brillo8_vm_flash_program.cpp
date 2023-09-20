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

#include <I2C_eeprom.h>

#include "brillo8_vm_flash_program.h"
#include "brillo8_vm_opcodes.h"

I2C_eeprom eeprom(0x50, I2C_DEVICESIZE_24LC256);

Brillo8FlashProgram::Brillo8FlashProgram() { }

void Brillo8FlashProgram::init() {
    eeprom.begin();

    if(!eeprom.isConnected())
        while(1);
    eeprom.determineSize();
}

void Brillo8FlashProgram::push(const uint8_t& instruction) {
    eeprom.writeByte(this->ptrc++, instruction);
}

void Brillo8FlashProgram::erase() {
    uint32_t size = eeprom.determineSize();
    for(uint32_t i = 0; i < size; i++)
        eeprom.writeByte(this->ptrc++, 0x00);
}

uint8_t& Brillo8FlashProgram::operator[](uint16_t address) {
    uint8_t value = eeprom.readByte(address);
    return value;
}

uint16_t Brillo8FlashProgram::size() {
    if(this->ptrc == 0)
        while(eeprom.readByte(this->ptrc) != B8_EOBC)
            this->ptrc++;

    return this->ptrc;
}