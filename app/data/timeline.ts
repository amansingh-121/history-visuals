export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alignment: "left" | "right";
  yPercentage: number;
}

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "ancient",
    title: "The Ancient World",
    description: "Foundations of civilization rise from the dust of time.",
    image: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?q=80&w=687",
    alignment: "left",
    yPercentage: 15,
  },
  {
    id: "medieval",
    title: "The Middle Ages",
    description: "Stone fortresses guard the secrets of a darker age.",
    image: "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?q=80&w=1471",
    alignment: "right",
    yPercentage: 45,
  },
  {
    id: "empire",
    title: "The Empire Age",
    description: "Golden spires touch the sky as humanity reaches new heights.",
    image: "https://www.aoemobile.com/m/img/page4/sld.png",
    alignment: "left",
    yPercentage: 75,
  },
];
