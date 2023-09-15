#include <I2C_eeprom.h>

#include "brillo8_vm_flash_program.h"
#include "brillo8_vm_opcodes.h"

I2C_eeprom eeprom(0x50, I2C_DEVICESIZE_24LC256);

FlashProgram::FlashProgram() { }

void FlashProgram::init() {
    eeprom.begin();

    if(!eeprom.isConnected())
        while(1);
    eeprom.determineSize();
}

void FlashProgram::push(const uint8_t& instruction) {
    eeprom.writeByte(this->ptrc++, instruction);
}

void FlashProgram::erase() {
    uint32_t size = eeprom.determineSize();
    for(uint32_t i = 0; i < size; i++)
        eeprom.writeByte(this->ptrc++, 0x00);
}

uint8_t& FlashProgram::operator[](uint16_t address) {
    uint8_t value = eeprom.readByte(address);
    return value;
}

uint16_t FlashProgram::size() {
    if(this->ptrc == 0)
        while(eeprom.readByte(this->ptrc) != EOBC)
            this->ptrc++;

    return this->ptrc;
}