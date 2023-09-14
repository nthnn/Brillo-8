#ifndef BRILLO8_VM_STACK_HPP
#define BRILLO8_VM_STACK_HPP

#include <Arduino.h>

#include "brillo8_vm_config.h"

class Brillo8Stack {
    private:
        uint8_t* elements;
        int16_t topIndex, maxSize;

    public:
        Brillo8Stack(uint16_t size = BRILLO8_DEFAULT_STACK_SIZE) {
            this->maxSize = size;
            this->elements = new uint8_t[this->maxSize];
            this->topIndex = -1;
        }

        ~Brillo8Stack() {
            delete[] this->elements;
        }

        void push(const uint8_t& item) {
            if(this->topIndex < this->maxSize - 1)
                this->elements[++this->topIndex] = item;
            else while(1);
        }

        uint8_t pop() {
            if(!this->empty())
                return this->elements[this->topIndex--];

            while(1);
            return (uint8_t) 0x00;
        }

        uint8_t top() const {
            if(!this->empty())
                return this->elements[this->topIndex];
            
            while (1);
            return (uint8_t) 0x00;
        }

        int16_t size() const {
            return this->topIndex + 1;
        }

        bool empty() const {
            return this->topIndex == -1;
        }
};

#endif