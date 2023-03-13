const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the input string when given a string input", () => {
    const input = "some partition key";
    const key = deterministicPartitionKey(input);
    expect(key).toBe(input);
  });

  it("Returns the input number when given a number input", () => {
    const input = 42;
    const key = deterministicPartitionKey(input);
    expect(key).toBe(input.toString());
  });

  it("Returns a hash of the input object when given an object input with no 'partitionKey' property", () => {
    const input = { foo: "bar", baz: [1, 2, 3] };
    const key = deterministicPartitionKey(input);
    expect(typeof key).toBe("string");
    expect(key.length).toBeGreaterThan(0);
    expect(key.length).toBeLessThanOrEqual(256);
  });

  it("Returns the 'partitionKey' property of the input object when given an object input with a 'partitionKey' property", () => {
    const input = { partitionKey: "some key value", otherProperty: "should be ignored" };
    const key = deterministicPartitionKey(input);
    expect(key).toBe(input.partitionKey);
  });

  it("Converts the input to a string if it is not already a string or an object", () => {
    const input = true;
    const key = deterministicPartitionKey(input);
    expect(key).toBe("true");
  });

  it("Hashes the input string if it is longer than 256 characters", () => {
    const input = "a".repeat(257);
    const key = deterministicPartitionKey(input);
    expect(typeof key).toBe("string");
    expect(key.length).toBeGreaterThan(0);
    expect(key.length).toBeLessThanOrEqual(256);
  });
});
