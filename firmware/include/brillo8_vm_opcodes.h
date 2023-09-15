#ifndef BRILLO8_VM_OPCODES_H
#define BRILLO8_VM_OPCODES_H

enum Opcode {
    PUSH,
    POP,

    ADD,
    SUB,
    MUL,
    DIV,
    REM,
    POW,

    AND,
    OR,
    SHL,
    SHR,

    LOG_AND,
    LOG_OR,

    LT,
    LE,
    GT,
    GE,
    EQ,
    NEQ,

    JMP,
    IF,
    ENDIF,
    YIELD,
    RESET,
    HALT,

    PIN_MODE,
    DIGITAL_READ,
    DIGITAL_WRITE,
    ANALOG_READ,
    ANALOG_WRITE,
    ANALOG_REFERENCE,
    PULSE_IN,
    PULSE_IN_LONG,

    LOAD,
    STORE,

    DELAY,
    DELAY_MICROSECONDS,
    MILLIS,
    MICROS,

    SHIFT_IN,
    SHIFT_OUT,

    TONE,
    NO_TONE,

    RANDOM,
    RANDOM_SEED,

    I2C_BEGIN,
    I2C_END,
    I2C_REQUEST,
    I2C_AVAILABLE,
    I2C_READ,
    I2C_WRITE,

    SPI_BEGIN,
    SPI_BEGIN_TRANSACTION,
    SPI_END,
    SPI_END_TRANSACTION,
    SPI_TRANSFER,
    SPI_USING_INTERRUPT,

    SOFT_SERIAL_BEGIN,
    SOFT_SERIAL_END,
    SOFT_SERIAL_AVAILABLE,
    SOFT_SERIAL_READ,
    SOFT_SERIAL_WRITE,

    EOBC
};

#endif