#include <Arduino.h>

#include "brillo8_vm_vector.h"

EEPROMVector::EEPROMVector() { }

void EEPROMVector::push(const uint8_t byte) {
}

void EEPROMVector::clear() {
}

uint8_t& EEPROMVector::operator[](uint8_t index) {
}

uint16_t EEPROMVector::size() const {
    return 65535;
}