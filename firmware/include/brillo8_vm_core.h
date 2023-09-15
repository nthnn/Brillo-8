#ifndef BRILLO8_VM_CORE_H
#define BRILLO8_VM_CORE_H

#include <SoftwareSerial.h>

#include "brillo8_vm_flash_program.h"
#include "brillo8_vm_stack.hpp"

class Brillo8VirtualMachine {
    private:
        Brillo8Stack stack;
        Brillo8FlashProgram flash;
        SoftwareSerial softSerial;
        uint16_t pc = 0;

    public:
        Brillo8VirtualMachine(Brillo8FlashProgram flash);
        void execute();
};

#endif