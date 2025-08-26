import ExcelJS from "exceljs";

export const useExcelExport = () => {
  const exportBorderRevenue = async (
    rows: any[],
    date1: String,
    date2: String
  ) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Report");

    // Header rows
    sheet.addRow(["ລ/ດ", "ດ່ານຊາຍແດນ", "ແຂວງ", `${date1} - ${date2}`]);
    sheet.addRow([
      "",
      "",
      "",
      "ຂະແໜງພາສີ (ບ53, ພາຫະນະ)",
      "",
      "ຂະແໜງອາກອນ (Visa on Arrival)",
      "",
      "",
      "ຂະແໜງໂຍທາ (ຄ່າຂ້າມຂົວ)",
      "",
      "ຂະແໜງທ່ອງທ່ຽວ (ກອງທຶນທ່ອງທ່ຽວ)",
      "",
      "ຂະແໜງ ຕມ (ປື້ມຜ່ານແດນ)",
      "",
      "ຂະແໜງກະຊິກຳ (ກັກກັນພຶດ)",
      "",
      "ຂະແໜງສາທາ (ອາຫານ ແລະ ຢາ)",
      "",
    ]);

    sheet.addRow([
      "",
      "",
      "",
      "ຈຳນວນທຸລະກຳ",
      "ຈຳນວນເງິນ",
      "ຈຳນວນທຸລະກຳ",
      "ຈຳນວນເງິນ (LAK)",
      "ຈຳນວນເງິນ (USD)",
      "ຈຳນວນທຸລະກຳ ",
      "ຈຳນວນເງິນ (LAK)",
      "ຈຳນວນທຸລະກຳ",
      "ຈຳນວນເງິນ",
      "ຈຳນວນທຸລະກຳ",
      "ຈຳນວນເງິນ",
      "ຈຳນວນທຸລະກຳ",
      "ຈຳນວນເງິນ",
      "ຈຳນວນທຸລະກຳ",
      "ຈຳນວນເງິນ",
    ]);

    sheet.mergeCells("A1:A3");
    sheet.mergeCells("C1:C3");
    sheet.mergeCells("B1:B3");
    sheet.mergeCells("D1:R1");
    sheet.mergeCells("D2:E2");

    sheet.mergeCells("F2:H2");
    sheet.mergeCells("I2:J2");
    sheet.mergeCells("K2:L2");
    sheet.mergeCells("M2:N2");
    sheet.mergeCells("O2:P2");
    sheet.mergeCells("Q2:R2");
    // add size to column
    for (let i = 1; i <= 10; i++) {
      sheet.getColumn(i).width = 15;
    }
    // format number
    sheet.getRow(3).eachCell((cell, colNumber) => {
      if (cell.value?.toString().includes("ຈຳນວນເງິນ")) {
        sheet.getColumn(colNumber).numFmt = "#,##0.00";
      }
      if (cell.value?.toString().includes("ຈຳນວນທຸລະກຳ")) {
        sheet.getColumn(colNumber).numFmt = "#,##0";
      }
    });

    // Style header
    [1, 2, 3].forEach((rowNum) => {
      sheet.getRow(rowNum).eachCell((cell) => {
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.font = {
          name: "Phetsarath OT",
          bold: true,
          size: rowNum === 1 ? 12 : 11,
          color: { argb: "#020407ff" },
        };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF90CAF9" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Add data rows
    rows.forEach((r) => sheet.addRow(r));

    // Style data rows (body)
    sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 3) {
        // skip header rows
        row.eachCell((cell) => {
          // Font
          cell.font = {
            name: "Phetsarath OT",
            size: 11,
            color: { argb: "FF000000" }, // black
          };
          // Alignment
          cell.alignment = {
            vertical: "middle",
            horizontal: "center",
          };
          // Borders
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      }
    });

    // Export file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "border_revenue_report_2024.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return { exportBorderRevenue };
};
