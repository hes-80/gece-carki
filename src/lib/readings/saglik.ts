export function healthLine(
  sun?: string,
  moon?: string,
  mars?: string,
  saturn?: string
) {
  return {
    headline: `${sun ?? "Güneş"} ritmi, ${moon ?? "Ay"} alışkanlıkları`,
    body:
      `Eğlence okuması: Güneş ${sun ?? "—"} günlük tempo ve canlılık temasını, ` +
      `Ay ${moon ?? "—"} uyku-beslenme ritmini konuşur. ` +
      `Mars ${mars ?? "—"} hareket tarzına, Satürn ${saturn ?? "—"} eklemlere ve uzun vadeli bakıma işaret eder. ` +
      `Bu bir teşhis değildir; vücut için takvim ve ritim metaforudur.`,
  };
}
