type TimingBucket = {
  count: number;
  totalMs: number;
  maxMs: number;
};

const counters = new Map<string, number>();
const timings = new Map<string, TimingBucket>();

export function incrementPerfCounter(name: string, delta = 1): void {
  counters.set(name, (counters.get(name) ?? 0) + delta);
}

export function recordPerfDuration(name: string, durationMsValue: number): void {
  const next = timings.get(name) ?? {
    count: 0,
    totalMs: 0,
    maxMs: 0,
  };
  next.count += 1;
  next.totalMs += durationMsValue;
  next.maxMs = Math.max(next.maxMs, durationMsValue);
  timings.set(name, next);
}
