#include <Arduino.h>

#include "brillo8_vm_config.h"
#include "brillo8_vm_core.h"
#include "brillo8_vm_opcodes.h"
#include "brillo8_vm_util.h"
#include "brillo8_vm_vector.h"

EEPROMVector program;
VirtualMachine mainVM;

int get_input_bytecode();

void setup() {
    pinMode(BRILLO8_BTN_PUSH, INPUT_PULLUP);
    pinMode(BRILLO8_BTN_FLASH, INPUT_PULLUP);

    pinMode(BRILLO8_LED_FLASH, OUTPUT);

    pinMode(BRILLO8_BTN_IN0, INPUT);
    pinMode(BRILLO8_BTN_IN1, INPUT);
    pinMode(BRILLO8_BTN_IN2, INPUT);
    pinMode(BRILLO8_BTN_IN3, INPUT);
    pinMode(BRILLO8_BTN_IN4, INPUT);
    pinMode(BRILLO8_BTN_IN5, INPUT);
    pinMode(BRILLO8_BTN_IN6, INPUT);
    pinMode(BRILLO8_BTN_IN7, INPUT);

    if(digitalRead(BRILLO8_BTN_FLASH) == LOW)
        program.clear();
}

void loop() {
    if(digitalRead(BRILLO8_BTN_PUSH) == LOW)
        program.push(get_input_bytecode());
    else if(digitalRead(BRILLO8_BTN_FLASH)) {
        mainVM.loadProgram(program);
        mainVM.execute();
    }
}

int get_input_bytecode() {
    char inputs[] = {
        digitalRead(BRILLO8_BTN_IN0) == LOW ? '1' : '0',
        digitalRead(BRILLO8_BTN_IN1) == LOW ? '1' : '0',
        digitalRead(BRILLO8_BTN_IN2) == LOW ? '1' : '0',
        digitalRead(BRILLO8_BTN_IN3) == LOW ? '1' : '0',
        digitalRead(BRILLO8_BTN_IN4) == LOW ? '1' : '0',
        digitalRead(BRILLO8_BTN_IN5) == LOW ? '1' : '0',
        digitalRead(BRILLO8_BTN_IN6) == LOW ? '1' : '0',
        digitalRead(BRILLO8_BTN_IN7) == LOW ? '1' : '0'
    };

    return binstring_to_num(inputs);
}