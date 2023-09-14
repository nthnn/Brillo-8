#ifndef BRILLO8_VM_CORE_H
#define BRILLO8_VM_CORE_H

#include <SoftwareSerial.h>

#include "brillo8_vm_stack.hpp"
#include "brillo8_vm_vector.h"

class VirtualMachine {
    private:
        Brillo8Stack stack;
        EEPROMVector memory;
        SoftwareSerial softSerial;
        uint16_t pc = 0;

    public:
        VirtualMachine();

        void loadProgram(const EEPROMVector& program);
        void execute();
};

#endif