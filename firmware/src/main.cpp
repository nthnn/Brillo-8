#include <Arduino.h>

#include "brillo8_vm_config.h"
#include "brillo8_vm_core.h"
#include "brillo8_vm_opcodes.h"
#include "brillo8_vm_util.h"

int get_input_bytecode();
void load_program();
void blink_once();

Brillo8FlashProgram flash;

void setup() {
    pinMode(BRILLO8_BTN_PUSH, INPUT_PULLUP);
    pinMode(BRILLO8_BTN_FLASH, INPUT_PULLUP);

    pinMode(BRILLO8_BTN_IN0, INPUT_PULLUP);
    pinMode(BRILLO8_BTN_IN1, INPUT_PULLUP);
    pinMode(BRILLO8_BTN_IN2, INPUT_PULLUP);
    pinMode(BRILLO8_BTN_IN3, INPUT_PULLUP);
    pinMode(BRILLO8_BTN_IN4, INPUT_PULLUP);
    pinMode(BRILLO8_BTN_IN5, INPUT_PULLUP);
    pinMode(BRILLO8_BTN_IN6, INPUT_PULLUP);
    pinMode(BRILLO8_BTN_IN7, INPUT_PULLUP);

    pinMode(BRILLO8_LED_FLASH, OUTPUT);

    flash.init();
    //if(digitalRead(BRILLO8_BTN_FLASH) == LOW)
    //    flash.erase();

    /*flash.erase();
    flash.push(PUSH);
    flash.push(13);
    flash.push(PUSH);
    flash.push(1);
    flash.push(PIN_MODE);

    flash.push(PUSH);
    flash.push(1);
    flash.push(DIGITAL_WRITE);
    flash.push(13);

    flash.push(PUSH);
    flash.push(250);
    flash.push(DELAY);

    flash.push(PUSH);
    flash.push(250);
    flash.push(DELAY);

    flash.push(PUSH);
    flash.push(250);
    flash.push(DELAY);

    flash.push(PUSH);
    flash.push(250);
    flash.push(DELAY);

    flash.push(PUSH);
    flash.push(0);
    flash.push(DIGITAL_WRITE);
    flash.push(13);

    flash.push(PUSH);
    flash.push(250);
    flash.push(DELAY);

    flash.push(PUSH);
    flash.push(250);
    flash.push(DELAY);

    flash.push(PUSH);
    flash.push(250);
    flash.push(DELAY);

    flash.push(PUSH);
    flash.push(250);
    flash.push(DELAY);

    flash.push(JMP);
    flash.push(4);

    flash.push(HALT);
    flash.push(EOBC);*/
    load_program();
}

void loop() {
    //if(digitalRead(BRILLO8_BTN_PUSH) == LOW)
    //    flash.push(get_input_bytecode());
    //else if(digitalRead(BRILLO8_BTN_FLASH))
    //    load_program();
}

void load_program() {
    Brillo8VirtualMachine mainVM(flash);
    mainVM.execute();

    while(1);
}

void blink_once() {
    digitalWrite(BRILLO8_LED_FLASH, 1);
    delay(300);
    digitalWrite(BRILLO8_LED_FLASH, 0);
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