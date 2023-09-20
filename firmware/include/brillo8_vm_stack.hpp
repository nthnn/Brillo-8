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
            return this->maxSize;
        }

        bool empty() const {
            return this->topIndex == -1;
        }
};

#endif