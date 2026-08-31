export function loveLine(sun?: string, venus?: string, moon?: string) {
  return {
    headline: `${venus ?? "Venüs"} çekim, ${moon ?? "Ay"} bağ`,
    body:
      `Eğlence okuması: Venüs ${venus ?? "—"} neye ısındığını, ` +
      `Ay ${moon ?? "—"} duygusal güvenlik arayışını, ` +
      `Güneş ${sun ?? "—"} ilişkide nasıl göründüğünü boyar. ` +
      `Bu bir ilişki tahmini değil; tarz ve ritim metaforudur.`,
  };
}