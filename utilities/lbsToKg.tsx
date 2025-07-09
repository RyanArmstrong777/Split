export function lbsToKg(weight: number): number {
    const kg = weight / 2.20462;
    return Math.round(kg * 10) / 10;
}