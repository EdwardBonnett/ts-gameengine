export function lerp (value: number, value2: number, amount: number) {
    return value * (1 - amount) + value2 * amount;
}
