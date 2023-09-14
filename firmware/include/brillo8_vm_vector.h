#ifndef BRILLO8_VM_VECTOR_HPP
#define BRILLO8_VM_VECTOR_HPP

#include <Arduino.h>

class EEPROMVector {
    private:
        uint16_t ptrc = 0;

    public:
        EEPROMVector();

        void push(const uint8_t byte);
        void clear();

        uint8_t& operator[](uint8_t index);
        uint16_t size() const;
};

#endif