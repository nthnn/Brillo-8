#include <Arduino.h>

#include "brillo8_vm_util.h"

int binstring_to_num(String binary) {
    int number;
    char* strbin = binary.c_str();

    for(int i = 0; i < 8; i++)
        number = (number << 1) + (*(strbin+i)-'0');
    return +number;
}