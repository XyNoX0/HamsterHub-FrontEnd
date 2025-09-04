export const getCourses = async () => {
  // กำหนด Timeout เป็น 5 วินาที
  const timeout = 10000; // 5000 มิลลิวินาที (5 วินาที)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(); // ยกเลิกคำขอเมื่อถึง Timeout
  }, timeout);

  try {
    const res = await fetch("https://nj.dekhub.com/hams/getoncourses", {
      signal: controller.signal, // ส่งสัญญาณ AbortController
    });

    clearTimeout(timeoutId); // ล้าง Timeout ถ้าคำขอสำเร็จ

    if (!res.ok) {
      throw new Error("Failed to fetch courses"); // เช็คสถานะของการตอบกลับ
    }

    return await res.json(); // คืนค่า JSON เมื่อสำเร็จ
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timeout after 5 seconds");
    } else {
      console.error("Fetch error:", error.message);
    }
    throw error; // โยนข้อผิดพลาดให้ฟังก์ชันที่เรียกใช้งานจัดการต่อ
  }
};

export const getCourseData = async (id) => {
  // กำหนด Timeout เป็น 5 วินาที
  const timeout = 20000; // 5000 มิลลิวินาที (5 วินาที)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(); // ยกเลิกคำขอเมื่อถึง Timeout
  }, timeout);

  try {
    const res = await fetch(`https://nj.dekhub.com/hams/course/${id}`, {
      signal: controller.signal, // ส่งสัญญาณ AbortController
    });

    clearTimeout(timeoutId); // ล้าง Timeout ถ้าคำขอสำเร็จ

    if (!res.ok) {
      throw new Error("Failed to fetch courses"); // เช็คสถานะของการตอบกลับ
    }

    return await res.json(); // คืนค่า JSON เมื่อสำเร็จ
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timeout after 5 seconds");
    } else {
      console.error("Fetch error:", error.message);
    }
    throw error; // โยนข้อผิดพลาดให้ฟังก์ชันที่เรียกใช้งานจัดการต่อ
  }
};

export async function submitApplication(formData) {
  try {
    const response = await fetch("https://nj.dekhub.com/hams/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json(); // คืนค่า JSON เมื่อสำเร็จ
  } catch (error) {
    throw error;
  }
}

export const GetPythonCourse = async () => {
  // กำหนด Timeout เป็น 5 วินาที
  const timeout = 10000; // 5000 มิลลิวินาที (5 วินาที)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(); // ยกเลิกคำขอเมื่อถึง Timeout
  }, timeout);

  try {
    const res = await fetch("https://nj.dekhub.com/hams/getPythonCourses", {
      signal: controller.signal, // ส่งสัญญาณ AbortController
    });

    clearTimeout(timeoutId); // ล้าง Timeout ถ้าคำขอสำเร็จ

    if (!res.ok) {
      throw new Error("Failed to fetch courses"); // เช็คสถานะของการตอบกลับ
    }

    return await res.json(); // คืนค่า JSON เมื่อสำเร็จ
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timeout after 5 seconds");
    } else {
      console.error("Fetch error:", error.message);
    }
    throw error; // โยนข้อผิดพลาดให้ฟังก์ชันที่เรียกใช้งานจัดการต่อ
  }
};

export const GetRobloxCourse = async () => {
  // กำหนด Timeout เป็น 5 วินาที
  const timeout = 10000; // 5000 มิลลิวินาที (5 วินาที)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(); // ยกเลิกคำขอเมื่อถึง Timeout
  }, timeout);

  try {
    const res = await fetch("https://nj.dekhub.com/hams/getRobloxCourses", {
      signal: controller.signal, // ส่งสัญญาณ AbortController
    });

    clearTimeout(timeoutId); // ล้าง Timeout ถ้าคำขอสำเร็จ

    if (!res.ok) {
      throw new Error("Failed to fetch courses"); // เช็คสถานะของการตอบกลับ
    }

    return await res.json(); // คืนค่า JSON เมื่อสำเร็จ
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timeout after 5 seconds");
    } else {
      console.error("Fetch error:", error.message);
    }
    throw error; // โยนข้อผิดพลาดให้ฟังก์ชันที่เรียกใช้งานจัดการต่อ
  }
};

export const GetUnityCourse = async () => {
  // กำหนด Timeout เป็น 5 วินาที
  const timeout = 10000; // 5000 มิลลิวินาที (5 วินาที)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(); // ยกเลิกคำขอเมื่อถึง Timeout
  }, timeout);

  try {
    const res = await fetch("https://nj.dekhub.com/hams/getUnityCourses", {
      signal: controller.signal, // ส่งสัญญาณ AbortController
    });

    clearTimeout(timeoutId); // ล้าง Timeout ถ้าคำขอสำเร็จ

    if (!res.ok) {
      throw new Error("Failed to fetch courses"); // เช็คสถานะของการตอบกลับ
    }

    return await res.json(); // คืนค่า JSON เมื่อสำเร็จ
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timeout after 5 seconds");
    } else {
      console.error("Fetch error:", error.message);
    }
    throw error; // โยนข้อผิดพลาดให้ฟังก์ชันที่เรียกใช้งานจัดการต่อ
  }
};

export const GetSpecialCourse = async () => {
  // กำหนด Timeout เป็น 5 วินาที
  const timeout = 10000; // 5000 มิลลิวินาที (5 วินาที)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(); // ยกเลิกคำขอเมื่อถึง Timeout
  }, timeout);

  try {
    const res = await fetch("https://nj.dekhub.com/hams/getSpecialCourses", {
      signal: controller.signal, // ส่งสัญญาณ AbortController
    });

    clearTimeout(timeoutId); // ล้าง Timeout ถ้าคำขอสำเร็จ

    if (!res.ok) {
      throw new Error("Failed to fetch courses"); // เช็คสถานะของการตอบกลับ
    }

    return await res.json(); // คืนค่า JSON เมื่อสำเร็จ
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timeout after 5 seconds");
    } else {
      console.error("Fetch error:", error.message);
    }
    throw error; // โยนข้อผิดพลาดให้ฟังก์ชันที่เรียกใช้งานจัดการต่อ
  }
};

export const GetCourseList = async () => {
  // กำหนด Timeout เป็น 5 วินาที
  const timeout = 10000; // 5000 มิลลิวินาที (5 วินาที)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(); // ยกเลิกคำขอเมื่อถึง Timeout
  }, timeout);

  try {
    const res = await fetch("https://nj.dekhub.com/hams/getCoursesList", {
      signal: controller.signal, // ส่งสัญญาณ AbortController
    });

    clearTimeout(timeoutId); // ล้าง Timeout ถ้าคำขอสำเร็จ

    if (!res.ok) {
      throw new Error("Failed to fetch courses"); // เช็คสถานะของการตอบกลับ
    }

    return await res.json(); // คืนค่า JSON เมื่อสำเร็จ
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timeout after 5 seconds");
    } else {
      console.error("Fetch error:", error.message);
    }
    throw error; // โยนข้อผิดพลาดให้ฟังก์ชันที่เรียกใช้งานจัดการต่อ
  }
};

export const GetMemberData = async (id) => {
  // กำหนด Timeout เป็น 5 วินาที
  const timeout = 10000; // 5000 มิลลิวินาที (5 วินาที)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(); // ยกเลิกคำขอเมื่อถึง Timeout
  }, timeout);

  try {
    const res = await fetch("https://nj.dekhub.com/hamsterhub/GetMemberData/" + String(id), {
      signal: controller.signal, // ส่งสัญญาณ AbortController
    });

    clearTimeout(timeoutId); // ล้าง Timeout ถ้าคำขอสำเร็จ

    if (!res.ok) {
      throw new Error("Failed to fetch courses"); // เช็คสถานะของการตอบกลับ
    }

    return await res.json(); // คืนค่า JSON เมื่อสำเร็จ
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timeout after 5 seconds");
    } else {
      console.error("Fetch error:", error.message);
    }
    throw error; // โยนข้อผิดพลาดให้ฟังก์ชันที่เรียกใช้งานจัดการต่อ
  }
};