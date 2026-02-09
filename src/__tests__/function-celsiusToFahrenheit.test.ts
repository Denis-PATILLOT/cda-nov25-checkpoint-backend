function celsiusToFahrenheit(celsiusTemp: number): number {
	return (celsiusTemp * 9.0) / 5.0 + 32.0;
}

describe("Function celsiusToFahrenheit", () => {
	it("return 32 for an argument of 0 (0°C) ", () => {
		expect(celsiusToFahrenheit(0)).toBe(32);
	});
	it("return 59 for an argument of 15 (15°C) ", () => {
		expect(celsiusToFahrenheit(15)).toBe(59);
	});
});
