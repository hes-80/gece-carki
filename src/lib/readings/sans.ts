export function luckLine(sun?: string, jupiter?: string, rising?: string) {
  return {
    headline: rising
      ? `Kapı: yükselen ${rising}`
      : `Kapı henüz kilitli, Güneş ${sun ?? "—"} yeter`,
    body:
      `Şans burada piyango değil; fırsatın göründüğü sahne. ` +
      `Jüpiter ${jupiter ?? "—"} büyüme koridoru. ` +
      (rising
        ? `Yükselen ${rising} dünyaya ilk çıkış tarzın.`
        : `Saat girilmediği için sahne (yükselen) tahmini değil.`) +
      ` Küçük denemeler, abartılı kehanetten daha eğlenceli durur.`,
  };
}