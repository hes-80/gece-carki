export function moneyLine(sun?: string, venus?: string, jupiter?: string) {
  return {
    headline: `${venus ?? "Venüs"} değer, ${jupiter ?? "Jüpiter"} genişleme`,
    body:
      `Sembolik okuma: Venüs ${venus ?? "—"} parayı ve emeği nereye bağlamak istediğini, ` +
      `Jüpiter ${jupiter ?? "—"} nerede büyümek istediğini anlatır. ` +
      `Güneş ${sun ?? "—"} çalışma kimliğini boyar. Yatırım tavsiyesi değildir.`,
  };
}