#ifndef BRILLO8_VM_FLASH_PROGRAM_H
#define BRILLO8_VM_FlASH_PROGRAM_H

#include <Arduino.h>

#include "brillo8_vm_config.h"

class Brillo8FlashProgram {
private:
    uint8_t* elements;
    uint16_t ptrc = 0;

public:
    Brillo8FlashProgram();

    void init();
    void push(const uint8_t& instruction);
    void erase();

    uint8_t& operator[](uint16_t index);
    uint16_t size();
};

#endif