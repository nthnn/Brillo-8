#ifndef BRILLO8_VM_CORE_H
#define BRILLO8_VM_CORE_H

#include <SoftwareSerial.h>

#include "brillo8_vm_flash_program.h"
#include "brillo8_vm_stack.hpp"

class VirtualMachine {
    private:
        Brillo8Stack stack;
        FlashProgram flash;
        SoftwareSerial softSerial;
        uint16_t pc = 0;

    public:
        VirtualMachine(FlashProgram flash);
        void execute();
};

#endif