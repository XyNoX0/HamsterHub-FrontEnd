"use client";

import { useEffect } from "react";
import { incrementLocalVisits } from "../../lib/stats-tracker";

/**
 * Component ลับสำหรับนับยอด Visit 
 * จะทำงานเมื่อหน้าโปรไฟล์โหลดเสร็จสมบูรณ์
 */
export function VisitsIncrementer({ slug }: { slug: string }) {
  useEffect(() => {
    // หน่วงเวลานิดนึงเพื่อให้แน่ใจว่าเป็นการเข้าชมจริง ไม่ใช่แค่โหลดผ่านๆ
    const timer = setTimeout(() => {
      incrementLocalVisits(slug);
      // ยิง Event เพื่อบอกให้ ProStatsBar รู้ว่าเลขเปลี่ยนแล้ว (ถ้าต้องการ Real-time)
      window.dispatchEvent(new CustomEvent("hh_visit_incremented", { detail: { slug } }));
    }, 1500);

    return () => clearTimeout(timer);
  }, [slug]);

  return null;
}
