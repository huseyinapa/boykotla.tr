import { Brand } from "@/app/types/brand";
import { NextResponse } from "next/server";

const boycottedBrands: Brand[] = [
  {
    id: 1,
    name: "Example Brand 1",
    slug: "a-haber",
    reason: "Supporting conflict",
    category: "Food & Beverages",
    subBrands: [
      {
        id: 11,
        name: "Sub Brand 1",
        reason: "Supporting conflict",
        category: "Food & Beverages",
      },
    ],
  },
  {
    id: 2,
    name: "Example Brand 2",
    reason: "Environmental concerns",
    category: "Clothing",
  },
];

export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        data: boycottedBrands,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch boycotted brands",
      },
      { status: 500 }
    );
  }
}
