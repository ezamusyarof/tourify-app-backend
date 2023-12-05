function generateCode(existingCodes) {
    const codeLength = 6;
    let code;
    do {
      code = Math.floor(Math.random() * 1000000).toString().padStart(codeLength, '0');
    } while (existingCodes.includes(code));
    return code;
}