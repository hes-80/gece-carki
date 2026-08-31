export function financeLine(sun?: string, venus?: string, jupiter?: string) {
  return {
    headline: `${venus ?? "Venüs"} değer, ${jupiter ?? "Jüpiter"} genişleme`,
    body:
      `Sembolik okuma: Venüs ${venus ?? "—"} neye para ve emek vermek istediğini, ` +
      `Jüpiter ${jupiter ?? "—"} nerede risk alıp büyümek istediğini anlatır. ` +
      `Güneş ${sun ?? "—"} çalışma kimliğini boyar. Yatırım tavsiyesi değildir.`,
  };
}
