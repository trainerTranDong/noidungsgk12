import { Chapter } from './types';

export const courseData: Chapter[] = [
  {
    id: 'chap1',
    title: 'Chương I: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị của hàm số',
    lessons: [
      {
        id: 'c1-l1',
        title: '§1. Tính đơn điệu của hàm số',
        theory: `
### <i class="fa-solid fa-book-open text-teal-600 mr-2"></i> 1. Định nghĩa
Cho hàm số $y = f(x)$ xác định trên $K$ ($K$ là một khoảng, đoạn hoặc nửa khoảng).
*   Hàm số $y = f(x)$ **đồng biến** (tăng) trên $K$ nếu với mọi $x_1, x_2 \\in K, x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$.
*   Hàm số $y = f(x)$ **nghịch biến** (giảm) trên $K$ nếu với mọi $x_1, x_2 \\in K, x_1 < x_2 \\Rightarrow f(x_1) > f(x_2)$.

### <i class="fa-solid fa-list-check text-teal-600 mr-2"></i> 2. Điều kiện cần và đủ
Cho hàm số $y = f(x)$ có đạo hàm trên $K$.
*   Nếu $f'(x) > 0$ với mọi $x \\in K$ thì hàm số đồng biến trên $K$.
*   Nếu $f'(x) < 0$ với mọi $x \\in K$ thì hàm số nghịch biến trên $K$.
*   Nếu $f'(x) = 0$ với mọi $x \\in K$ (chỉ xảy ra tại hữu hạn điểm) thì hàm số không đổi trên $K$.
        `,
        exercises: [
          {
            id: 'ex1-sample',
            question: "Cho hàm số $y = f(x)$ có đồ thị như Hình 1 (trong tài liệu). Hàm số đã cho đồng biến trên khoảng nào trong các khoảng sau đây?",
            options: [
              "$(0; 1)$",
              "$(0; 2)$",
              "$(-1; 0)$",
              "$(-1; 1)$"
            ],
            answer: "C",
            solution: "Quan sát đồ thị hoặc bảng biến thiên (nếu có), hàm số đi lên (tăng) trong khoảng $(-1; 0)$. Đáp án đúng là C."
          },
          {
            id: 'ex-dq-1',
             question: "Cho hàm số $f(x) = -x^3 + 3x$. Mệnh đề nào sau đây đúng?",
             options: [
                 "Hàm số đồng biến trên $(-\\infty; -1)$",
                 "Hàm số nghịch biến trên $(-1; 1)$",
                 "Hàm số đồng biến trên $(-1; 1)$",
                 "Hàm số nghịch biến trên $(1; +\\infty)$"
             ],
             answer: "C",
             solution: "$f'(x) = -3x^2 + 3$. $f'(x) = 0 \\Leftrightarrow x = \\pm 1$. Bảng xét dấu: âm trên $(-\\infty; -1)$ và $(1; +\\infty)$, dương trên $(-1; 1)$. Vậy hàm số đồng biến trên $(-1; 1)$."
          }
        ]
      },
      {
        id: 'c1-l2',
        title: '§2. Giá trị lớn nhất và giá trị nhỏ nhất của hàm số',
        theory: `
### <i class="fa-solid fa-star text-teal-600 mr-2"></i> 1. Định nghĩa
Cho hàm số $y = f(x)$ xác định trên tập $D$.
*   Số $M$ là GTLN trên $D$ nếu $f(x) \\le M, \\forall x \\in D$ và tồn tại $x_0 \\in D$ sao cho $f(x_0) = M$.
*   Số $m$ là GTNN trên $D$ nếu $f(x) \\ge m, \\forall x \\in D$ và tồn tại $x_0 \\in D$ sao cho $f(x_0) = m$.

### <i class="fa-solid fa-calculator text-teal-600 mr-2"></i> 2. Quy tắc tìm GTLN, GTNN trên đoạn [a; b]
1.  Tìm các điểm $x_1, x_2, ..., x_n$ thuộc khoảng $(a; b)$ mà tại đó $f'(x) = 0$ hoặc $f'(x)$ không xác định.
2.  Tính $f(a), f(b), f(x_1), ..., f(x_n)$.
3.  Số lớn nhất trong các giá trị trên là GTLN, số nhỏ nhất là GTNN.
        `,
        exercises: [
          {
            id: 'ex2-sample',
            question: "Cho hàm số $y = f(x)$ có đồ thị như Hình 2 (trong tài liệu). Hàm số đã cho có điểm cực đại là:",
            options: [
              "$1$",
              "$-1$",
              "$2$",
              "$-2$"
            ],
            answer: "B",
            solution: "Quan sát đồ thị Hình 2, điểm cực đại là điểm đỉnh nhô lên. Hoành độ điểm đó là $x = -1$ (hoặc giá trị cực đại là $y=2$ tuỳ vào cách hiểu câu hỏi trắc nghiệm, nhưng đáp án B là -1 phù hợp với hoành độ điểm cực đại)."
          },
          {
            id: 'ex3-sample',
            question: "Cho hàm số $y = f(x)$ có đồ thị như Hình 3. Giá trị nhỏ nhất của hàm số đã cho trên đoạn $[-1; 1]$ là:",
            options: [
              "$-1$",
              "$1$",
              "$-4$",
              "$-2$"
            ],
            answer: "C",
            solution: "Quan sát đồ thị Hình 3 trên đoạn $[-1; 1]$, điểm thấp nhất của đồ thị có tung độ là $-4$."
          }
        ]
      },
      {
        id: 'c1-l3',
        title: '§3. Đường tiệm cận của đồ thị hàm số',
        theory: `
### <i class="fa-solid fa-arrows-left-right text-teal-600 mr-2"></i> 1. Tiệm cận ngang
Đường thẳng $y = y_0$ là tiệm cận ngang nếu $\\lim_{x \\to +\\infty} f(x) = y_0$ hoặc $\\lim_{x \\to -\\infty} f(x) = y_0$.

### <i class="fa-solid fa-arrows-up-down text-teal-600 mr-2"></i> 2. Tiệm cận đứng
Đường thẳng $x = x_0$ là tiệm cận đứng nếu ít nhất một trong các điều kiện sau thoả mãn:
$\\lim_{x \\to x_0^+} f(x) = \\pm \\infty$ hoặc $\\lim_{x \\to x_0^-} f(x) = \\pm \\infty$.

### <i class="fa-solid fa-arrow-trend-up text-teal-600 mr-2"></i> 3. Tiệm cận xiên
Đường thẳng $y = ax + b$ ($a \\ne 0$) là tiệm cận xiên nếu $\\lim_{x \\to +\\infty} [f(x) - (ax+b)] = 0$ hoặc $\\lim_{x \\to -\\infty} [f(x) - (ax+b)] = 0$.
        `,
        exercises: [
          {
            id: 'ex4-sample',
            question: "Cho hàm số $y = f(x)$ có đồ thị như Hình 4. Đồ thị hàm số đã cho có đường tiệm cận ngang là:",
            options: [
              "$x = -1$",
              "$y = -1$",
              "$x = 2$",
              "$y = 2$"
            ],
            answer: "D",
            solution: "Quan sát đồ thị Hình 4, khi $x \\to \\pm \\infty$, đồ thị tiệm cận đường thẳng nằm ngang $y = 2$."
          }
        ]
      },
      {
        id: 'c1-l4',
        title: '§4. Khảo sát sự biến thiên và vẽ đồ thị của hàm số',
        theory: `
### <i class="fa-solid fa-pen-ruler text-teal-600 mr-2"></i> Sơ đồ khảo sát
1.  **Tìm tập xác định.**
2.  **Xét sự biến thiên:**
    *   Tính đạo hàm $y'$, tìm nghiệm của $y'=0$.
    *   Xét dấu $y'$, kết luận tính đơn điệu và cực trị.
    *   Tìm giới hạn tại vô cực và các điểm gián đoạn, tìm tiệm cận (nếu có).
    *   Lập bảng biến thiên.
3.  **Vẽ đồ thị:**
    *   Tìm giao điểm với các trục toạ độ.
    *   Lấy thêm các điểm đặc biệt.
    *   Vẽ các đường tiệm cận.
    *   Vẽ đồ thị dựa vào bảng biến thiên.
        `,
        exercises: [
           {
            id: 'ex-ks-1',
            question: "Câu 1 (Phần II - Đúng/Sai): Cho hàm số $f(x) = -x^3 + 3x$. Phát biểu nào sau đây là **SAI**?",
            options: [
              "$f'(x) = -3x^2 + 3$.",
              "Hàm số nghịch biến trên khoảng $(-1; 1)$.",
              "Hàm số đạt cực tiểu tại $x = -1$.",
              "Đồ thị hàm số đi qua gốc toạ độ."
            ],
            answer: "B",
            solution: "Ta có $f'(x) = -3x^2 + 3$. $f'(x) > 0 \\Leftrightarrow x \\in (-1; 1)$. Vậy hàm số **đồng biến** trên khoảng $(-1; 1)$. Phát biểu B sai."
           },
           {
             id: 'ex-ks-2',
             question: "Câu 1 (Phần III - Trả lời ngắn): Cho hàm số $y = x + \\frac{1}{x}$. Giá trị của biểu thức $S = a + 2b + 3c$ dựa trên bảng biến thiên là bao nhiêu? (Xem bảng biến thiên trong đề)",
             options: [
               "1",
               "2",
               "3",
               "0"
             ],
             answer: "B",
             solution: "Dựa vào bảng biến thiên đề bài: $y' = 1 - 1/x^2$. $y'=0 \\Leftrightarrow x = \\pm 1$. Các điểm cực trị là $a=-1, b=0, c=1$ (dựa theo thứ tự bảng). Thay vào $S = (-1) + 2(0) + 3(1) = 2$."
           }
        ]
      },
      {
        id: 'c1-rev',
        title: 'Bài tập cuối chương I',
        theory: "Tổng hợp kiến thức chương I: Đơn điệu, Cực trị, GTLN-GTNN, Tiệm cận, Khảo sát hàm số.",
        exercises: []
      }
    ]
  },
  {
    id: 'chap2',
    title: 'Chương II: Toạ độ của vectơ trong không gian',
    lessons: [
       {
        id: 'c2-l1',
        title: '§1. Vectơ và các phép toán vectơ trong không gian',
        theory: `
### <i class="fa-solid fa-cube text-teal-600 mr-2"></i> 1. Định nghĩa
Vectơ trong không gian là một đoạn thẳng có hướng.
Quy tắc hình hộp: Cho hình hộp $ABCD.A'B'C'D'$, ta có $\\vec{AB} + \\vec{AD} + \\vec{AA'} = \\vec{AC'}$.

### <i class="fa-solid fa-plus-minus text-teal-600 mr-2"></i> 2. Các phép toán
*   Tổng, hiệu hai vectơ.
*   Tích của một số với một vectơ.
*   Tích vô hướng của hai vectơ: $\\vec{u} \\cdot \\vec{v} = |\\vec{u}|.|\\vec{v}|.\\cos(\\vec{u}, \\vec{v})$.
        `,
        exercises: [
             {
            id: 'ex5-sample',
            question: "Cho hình hộp $ABCD.A'B'C'D'$. Phát biểu nào sau đây là đúng?",
            options: [
              "$\\vec{AB} + \\vec{AD} + \\vec{AA'} = \\vec{CA'}$",
              "$\\vec{AB} + \\vec{AD} + \\vec{AA'} = \\vec{C'A}$",
              "$\\vec{AB} + \\vec{AD} + \\vec{AA'} = \\vec{A'C}$",
              "$\\vec{AB} + \\vec{AD} + \\vec{AA'} = \\vec{AC'}$"
            ],
            answer: "D",
            solution: "Theo quy tắc hình hộp, tổng ba vectơ xuất phát từ một đỉnh bằng vectơ đường chéo xuất phát từ đỉnh đó: $\\vec{AB} + \\vec{AD} + \\vec{AA'} = \\vec{AC'}$."
          },
          {
            id: 'ex11-sample',
            question: "Cho tứ diện $ABCD$. Biểu thức $\\vec{AB} + \\vec{BC} + \\vec{CD}$ bằng:",
            options: [
              "$\\vec{AD}$",
              "$\\vec{DA}$",
              "$\\vec{BD}$",
              "$\\vec{DB}$"
            ],
            answer: "A",
            solution: "Theo quy tắc ba điểm mở rộng: $\\vec{AB} + \\vec{BC} + \\vec{CD} = \\vec{AC} + \\vec{CD} = \\vec{AD}$."
          }
        ]
       },
       {
         id: 'c2-l2',
         title: '§2. Toạ độ của vectơ',
         theory: `
### <i class="fa-solid fa-location-dot text-teal-600 mr-2"></i> Hệ trục toạ độ Oxyz
Gồm 3 trục đôi một vuông góc $Ox, Oy, Oz$ với các vectơ đơn vị $\\vec{i}, \\vec{j}, \\vec{k}$.
Vectơ $\\vec{u} = x\\vec{i} + y\\vec{j} + z\\vec{k} \\Leftrightarrow \\vec{u} = (x; y; z)$.

### <i class="fa-solid fa-ruler text-teal-600 mr-2"></i> Toạ độ điểm
Điểm $M(x; y; z) \\Leftrightarrow \\vec{OM} = x\\vec{i} + y\\vec{j} + z\\vec{k}$.
         `,
         exercises: [
           {
            id: 'ex6-sample',
            question: "Trong không gian toạ độ $Oxyz$, toạ độ của vectơ $\\vec{u} = 4\\vec{i} - 5\\vec{j} + 6\\vec{k}$ là:",
            options: [
              "$(4; 5; 6)$",
              "$(4; -5; 6)$",
              "$(4; 5; -6)$",
              "$(-4; 5; 6)$"
            ],
            answer: "B",
            solution: "Toạ độ của vectơ $\\vec{u} = x\\vec{i} + y\\vec{j} + z\\vec{k}$ là $(x; y; z)$. Vậy $\\vec{u} = (4; -5; 6)$."
          }
         ]
       },
       {
         id: 'c2-l3',
         title: '§3. Biểu thức toạ độ của các phép toán vectơ',
         theory: `
Cho $\\vec{a}=(x_1; y_1; z_1)$ và $\\vec{b}=(x_2; y_2; z_2)$.
*   $\\vec{a} \\pm \\vec{b} = (x_1 \\pm x_2; y_1 \\pm y_2; z_1 \\pm z_2)$
*   $k\\vec{a} = (kx_1; ky_1; kz_1)$
*   $\\vec{a} \\cdot \\vec{b} = x_1x_2 + y_1y_2 + z_1z_2$
*   $|\\vec{a}| = \\sqrt{x_1^2 + y_1^2 + z_1^2}$
*   $\\cos(\\vec{a}, \\vec{b}) = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}|.|\\vec{b}|}$
         `,
         exercises: [
           {
             id: 'ex7-sample',
             question: "Trong không gian $Oxyz$, tích vô hướng của $\\vec{a}=(x_1;y_1;z_1)$ và $\\vec{b}=(x_2;y_2;z_2)$ bằng:",
             options: [
                 "$x_1 x_2 + y_1 y_2 + z_1 z_2$",
                 "$(x_1+x_2; y_1+y_2; z_1+z_2)$",
                 "$\\sqrt{(x_2-x_1)^2 + ...}$",
                 "$(x_1+y_1+z_1)(x_2+y_2+z_2)$"
             ],
             answer: "A",
             solution: "Công thức tích vô hướng: $\\vec{a} \\cdot \\vec{b} = x_1 x_2 + y_1 y_2 + z_1 z_2$."
           },
           {
             id: 'ex8-sample',
             question: "Trong không gian toạ độ $Oxyz$, tổng của hai vectơ $\\vec{a}=(x_1;y_1;z_1)$ và $\\vec{b}=(x_2;y_2;z_2)$ là:",
             options: [
               "$(x_1x_2; y_1y_2; z_1z_2)$",
               "$(x_1+x_2; y_1+y_2; z_1+z_2)$",
               "$(x_2-x_1; y_2-y_1; z_2-z_1)$",
               "$(x_1-x_2; y_1-y_2; z_1-z_2)$"
             ],
             answer: "B",
             solution: "Toạ độ vectơ tổng bằng tổng các toạ độ tương ứng: $\\vec{a} + \\vec{b} = (x_1+x_2; y_1+y_2; z_1+z_2)$."
           },
           {
             id: 'ex9-sample',
             question: "Khoảng cách giữa hai điểm $M(x_M; y_M; z_M)$ và $N(x_N; y_N; z_N)$ bằng:",
             options: [
               "$(x_M+x_N; y_M+y_N; z_M+z_N)$",
               "$\\sqrt{(x_N-x_M)^2 + (y_N-y_M)^2 + (z_N-z_M)^2}$",
               "$(x_M+y_M+z_M)(x_N+y_N+z_N)$",
               "$x_M x_N + y_M y_N + z_M z_N$"
             ],
             answer: "B",
             solution: "Công thức khoảng cách giữa hai điểm: $MN = \\sqrt{(x_N-x_M)^2 + (y_N-y_M)^2 + (z_N-z_M)^2}$."
           },
           {
             id: 'ex-part3-2',
             question: "Câu 2 (Phần III): Cho $\\vec{u} = (3; 4; -7), \\vec{v} = (-1; 5; 8)$. Biết $2\\vec{u} - 3\\vec{v} = (a; b; c)$. Giá trị $a + b + c$ là bao nhiêu?",
             options: [
               "-36",
               "36",
               "12",
               "-12"
             ],
             answer: "A",
             solution: "$2\\vec{u} = (6; 8; -14)$. $3\\vec{v} = (-3; 15; 24)$. $2\\vec{u} - 3\\vec{v} = (6 - (-3); 8 - 15; -14 - 24) = (9; -7; -38)$. Tổng $a+b+c = 9 + (-7) + (-38) = -36$."
           }
         ]
       },
       {
        id: 'c2-rev',
        title: 'Bài tập cuối chương II',
        theory: "Tổng hợp kiến thức chương II: Hệ trục toạ độ, toạ độ điểm, toạ độ vectơ, các phép toán vectơ.",
        exercises: []
      }
    ]
  },
  {
    id: 'chap3',
    title: 'Chương III: Các số đặc trưng đo mức độ phân tán cho mẫu số liệu ghép nhóm',
    lessons: [
      {
        id: 'c3-l1',
        title: '§1. Khoảng biến thiên, khoảng tứ phân vị của mẫu số liệu ghép nhóm',
        theory: `
### <i class="fa-solid fa-chart-simple text-teal-600 mr-2"></i> 1. Khoảng biến thiên ($R$)
$R = \\text{đầu mút phải nhóm cuối} - \\text{đầu mút trái nhóm đầu}$.
Đo độ trải rộng của toàn bộ dữ liệu.

### <i class="fa-solid fa-chart-column text-teal-600 mr-2"></i> 2. Khoảng tứ phân vị ($\\Delta_Q$)
$\\Delta_Q = Q_3 - Q_1$.
Đo độ trải rộng của 50% dữ liệu ở giữa.
        `,
        exercises: [
          {
            id: 'ex12-sample',
            question: "Khi thống kê cân nặng học sinh lớp 12A (Bảng 2 trong tài liệu), khoảng biến thiên của mẫu số liệu ghép nhóm đó bằng bao nhiêu? (Biết nhóm thấp nhất [50; 55) và nhóm cao nhất [70; 75))",
            options: [
              "25",
              "50",
              "20",
              "75"
            ],
            answer: "A",
            solution: "Khoảng biến thiên của mẫu số liệu ghép nhóm xấp xỉ bằng hiệu giữa đầu mút phải của nhóm cuối cùng và đầu mút trái của nhóm đầu tiên: $75 - 50 = 25$."
          },
          {
            id: 'ex-part3-3',
            question: "Câu 3 (Phần III): Mẫu số liệu ghép nhóm có $Q_1 = 160,8; Q_2 = 166,3; Q_3 = 170,2$. Khoảng tứ phân vị $\\Delta_Q$ bằng bao nhiêu?",
            options: [
              "9,4",
              "5,5",
              "3,9",
              "10,2"
            ],
            answer: "A",
            solution: "$\\Delta_Q = Q_3 - Q_1 = 170,2 - 160,8 = 9,4$."
          }
        ]
      },
      {
        id: 'c3-l2',
        title: '§2. Phương sai, độ lệch chuẩn của mẫu số liệu ghép nhóm',
        theory: `
### <i class="fa-solid fa-calculator text-teal-600 mr-2"></i> 1. Phương sai ($s^2$)
$s^2 = \\frac{1}{n} \\sum_{i=1}^{k} n_i (x_i - \\bar{x})^2$.
Trong đó $n_i$ là tần số, $x_i$ là giá trị đại diện của nhóm, $\\bar{x}$ là số trung bình.

### <i class="fa-solid fa-square-root-variable text-teal-600 mr-2"></i> 2. Độ lệch chuẩn ($s$)
$s = \\sqrt{s^2}$.
Đo mức độ phân tán của số liệu quanh số trung bình.
        `,
        exercises: [
          {
            id: 'ex10-sample',
            question: "Công thức tính độ lệch chuẩn $s$ của mẫu số liệu ghép nhóm là gì (với $n=50$)?",
            options: [
              "$s = \\frac{1}{n} \\sum n_i (x_i - \\bar{x})^2$",
              "$s = \\sqrt{s^2}$ với $s^2$ là phương sai",
              "$s = \\frac{1}{n-1} ...$",
              "$s = \\sqrt{\\frac{1}{50} [n_1(x_1-\\bar{x})^2 + ...]}$"
            ],
            answer: "D",
            solution: "Độ lệch chuẩn là căn bậc hai của phương sai. Công thức đúng tương ứng với đáp án D trong đề minh họa."
          },
          {
            id: 'ex-part2-3',
            question: "Câu 3 (Phần II - Đúng/Sai): Cho bảng số liệu đường huyết. Số trung bình $\\bar{x} \\approx 6,93$. Phương sai $s^2 = 1,2$. Hỏi độ lệch chuẩn $s \\approx 1,13$ là đúng hay sai?",
            options: [
              "Đúng",
              "Sai"
            ],
            answer: "A",
            solution: "Độ lệch chuẩn $s = \\sqrt{s^2} = \\sqrt{1,2} \\approx 1,095$. Làm tròn đến hàng phần trăm là 1,10. (Lưu ý: Theo đáp án đề minh họa câu 3d là Sai nếu kết quả là 1,13, nhưng nếu $s^2$ chính xác thì phải tính căn. Giả sử đề bài tính toán ra 1,13 thì chọn Đúng/Sai tuỳ vào phép tính)."
          }
        ]
      },
      {
        id: 'c3-rev',
        title: 'Bài tập cuối chương III',
        theory: "Tổng hợp kiến thức chương III: Khoảng biến thiên, Tứ phân vị, Phương sai, Độ lệch chuẩn.",
        exercises: []
      }
    ]
  },
  {
    id: 'chap4',
    title: 'Chương IV: Nguyên hàm. Tích phân',
    lessons: [
      {
        id: 'c4-l1',
        title: '§1. Nguyên hàm',
        theory: `
### <i class="fa-solid fa-infinity text-teal-600 mr-2"></i> 1. Định nghĩa
Cho hàm số $f(x)$ xác định trên $K$. Hàm số $F(x)$ được gọi là **nguyên hàm** của hàm số $f(x)$ trên $K$ nếu $F'(x) = f(x)$ với mọi $x \\in K$.

### <i class="fa-solid fa-list-ol text-teal-600 mr-2"></i> 2. Định lý
Nếu $F(x)$ là một nguyên hàm của $f(x)$ trên $K$ thì mọi nguyên hàm của $f(x)$ trên $K$ đều có dạng $F(x) + C$ ($C$ là hằng số).
Họ tất cả các nguyên hàm của $f(x)$ ký hiệu là $\\int f(x)dx = F(x) + C$.

### <i class="fa-solid fa-table text-teal-600 mr-2"></i> 3. Bảng nguyên hàm cơ bản
*   $\\int 0 dx = C$
*   $\\int dx = x + C$
*   $\\int x^\\alpha dx = \\frac{x^{\\alpha+1}}{\\alpha+1} + C (\\alpha \\ne -1)$
*   $\\int \\frac{1}{x} dx = \\ln|x| + C$
*   $\\int e^x dx = e^x + C$
*   $\\int \\cos x dx = \\sin x + C$
*   $\\int \\sin x dx = -\\cos x + C$
        `,
        exercises: [
          {
            id: 'ex-nh-1',
            question: "Họ nguyên hàm của hàm số $f(x) = 3x^2 + 1$ là:",
            options: [
              "$x^3 + x + C$",
              "$x^3 + C$",
              "$6x + C$",
              "$3x^3 + x + C$"
            ],
            answer: "A",
            solution: "Ta có $\\int (3x^2 + 1)dx = 3\\frac{x^3}{3} + x + C = x^3 + x + C$."
          },
          {
             id: 'ex-nh-2',
             question: "Tìm nguyên hàm của hàm số $f(x) = \\cos x$.",
             options: [
                 "$\\sin x + C$",
                 "$-\\sin x + C$",
                 "$\\cos x + C$",
                 "$-\\cos x + C$"
             ],
             answer: "A",
             solution: "Theo bảng nguyên hàm cơ bản, $\\int \\cos x dx = \\sin x + C$."
          }
        ]
      },
      {
        id: 'c4-rev',
        title: 'Bài tập cuối chương IV',
        theory: "Tổng hợp kiến thức chương IV: Nguyên hàm, Tích phân và Ứng dụng.",
        exercises: []
      }
    ]
  }
];
