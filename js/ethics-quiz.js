/* ==========================================================================
   INF2501 Portfolio — Interactive Ethics & Integrity Modules (js/ethics-quiz.js)
   For bai6.html:
     1) 7 Principles 3D Flip Cards (with exploration tracker & Flip All / Reset)
     2) 6-Scenario Academic Integrity Quiz (instant feedback, score & badge)
   ========================================================================== */

(function () {
  'use strict';

  var PRINCIPLES = [
    {
      num: '01',
      icon: '🔍',
      title: 'Minh bạch & Trích dẫn nguồn AI',
      shortDesc: 'Công khai mọi công cụ AI đã hỗ trợ và mục đích sử dụng trong sản phẩm học thuật.',
      detail: 'Luôn ghi rõ tên công cụ (ChatGPT, Gemini, Canva AI, Suno AI...), phiên bản hoặc bối cảnh dùng để phác thảo ý tưởng hay xử lý hậu kỳ, tuyệt đối không mạo nhận sản phẩm của AI là 100% sức sáng tạo cá nhân.',
      example: 'Áp dụng: Trên Portfolio INF2501, ghi chú rõ dùng ChatGPT phác thảo trò chơi Khởi động ở Bài 5 và giữ ảnh chụp đầu ra gốc để đối chiếu.'
    },
    {
      num: '02',
      icon: '🎼',
      title: 'Human-in-the-Loop (Kiểm duyệt chuyên môn)',
      shortDesc: 'Giáo viên & sinh viên giữ quyền kiểm chứng cuối cùng qua SGK và tài liệu chuẩn.',
      detail: 'Mô hình ngôn ngữ lớn có thể "ảo giác" kiến thức chuyên ngành. Mọi thông tin do AI sinh ra phải được đối chiếu với sách giáo khoa, giáo trình và học liệu uy tín trước khi đưa vào bài giảng.',
      example: 'Áp dụng: Chặn kịp thời lỗi AI phân loại kèn Saxophone vào Bộ Đồng; khẳng định đúng theo SGK là Bộ Gỗ vì dùng dăm kèn.'
    },
    {
      num: '03',
      icon: '💛',
      title: 'Ưu tiên Cảm xúc & Thính giác Sư phạm',
      shortDesc: 'Không để văn phong AI khô cứng thay thế tương tác người – người trong lớp học.',
      detail: 'AI không có thính giác thực thụ và thiếu "trí tuệ cảm xúc" trên bục giảng. Cần biên tập lại lời dẫn gần gũi tâm lý học sinh và kết hợp bản thu âm chuẩn thay cho mô tả chữ thuần túy.',
      example: 'Áp dụng: Chỉnh sửa 100% lời dẫn Bộ Dây từ liệt kê khô khan thành câu chuyện gia đình "chị Violin – ông Contrabass" kèm nghe trích đoạn Mùa Xuân.'
    },
    {
      num: '04',
      icon: '🛡️',
      title: 'Bảo mật dữ liệu cá nhân & Học sinh',
      shortDesc: 'Không đưa thông tin định danh nhạy cảm lên các nền tảng AI công cộng.',
      detail: 'Tuyệt đối không nhập CCCD, số điện thoại, địa chỉ nhà, tài khoản ngân hàng, hay danh sách họ tên – điểm số thật của học sinh THCS vào khung chat AI để tránh rò rỉ dữ liệu.',
      example: 'Áp dụng: Chỉ nhập ngữ cảnh chung ("học sinh lớp 6", "tiết 45 phút") khi viết prompt; ẩn danh toàn bộ dữ liệu thực nghiệm.'
    },
    {
      num: '05',
      icon: '⚖️',
      title: 'Tôn trọng Bản quyền & Tác quyền Âm nhạc',
      shortDesc: 'Cẩn trọng với nguồn nhạc tách beat, phối khí AI và hình ảnh minh họa.',
      detail: 'Khi dùng Moises tách beat, Suno AI tạo nhạc nền hoặc Midjourney tạo ảnh, cần kiểm tra điều khoản sử dụng phi thương mại, ghi rõ nguồn gốc AI và tôn trọng tác giả tác phẩm gốc.',
      example: 'Áp dụng: Sản phẩm video Nhóm 10 ghi chú rõ các ứng dụng hỗ trợ (Moises, Suno AI, Midjourney) phục vụ mục đích học tập & nghiên cứu.'
    },
    {
      num: '06',
      icon: '🎓',
      title: 'AI là Trợ lý — Không ỷ lại làm thay',
      shortDesc: 'Rèn luyện năng lực sư phạm cốt lõi: xướng âm, hòa âm, tổ chức lớp học.',
      detail: 'AI giúp tiết kiệm ~75% thời gian phác thảo giáo án và tránh bí ý tưởng, nhưng người học phải tự xây dựng mục tiêu, thiết kế hoạt động khả thi và rèn kỹ năng sư phạm thực tế.',
      example: 'Áp dụng: Loại bỏ gợi ý phi thực tế của ChatGPT ("giấu Trumpet và Cello sau lưng") để chuyển thành trò chơi "Lắng nghe giai điệu ẩn danh".'
    },
    {
      num: '07',
      icon: '📑',
      title: 'Lưu vết & Trách nhiệm Giải trình',
      shortDesc: 'Lưu lại prompt, phản hồi gốc và bản biên tập để chứng minh quá trình học tập.',
      detail: 'Sinh viên chịu trách nhiệm 100% về tính chính xác, liêm chính và phù hợp văn hóa của sản phẩm cuối cùng. Lưu giữ lịch sử trao đổi với AI là minh chứng rõ nhất cho nỗ lực tự học.',
      example: 'Áp dụng: Lưu đầy đủ 03 ảnh chụp ChatGPT trong báo cáo Bài 5 và đối chiếu rõ phần AI gợi ý với phần sinh viên biên tập.'
    }
  ];

  var QUIZ_QUESTIONS = [
    {
      id: 'q1',
      tag: 'Kiểm chứng chuyên môn (Bài 5)',
      question: 'Khi nhờ AI tóm tắt phân loại nhạc cụ phương Tây cho học sinh lớp 6, AI viết rằng "Kèn Saxophone thuộc Bộ Đồng vì thân kèn làm bằng kim loại đồng thau". Bạn nên xử lý thế nào?',
      options: [
        'Giữ nguyên kết quả của AI vì AI đã tổng hợp từ nhiều nguồn tiếng Anh.',
        'Đối chiếu với Sách giáo khoa Âm nhạc: sửa lại Saxophone thuộc Bộ Gỗ (vì phát âm bằng dăm kèn đơn), đồng thời ghi nhận đây là lỗi "ảo giác" AI cần kiểm duyệt.',
        'Xóa luôn phần giới thiệu kèn Saxophone khỏi giáo án để tránh tranh cãi.',
        'Chấp nhận viết cả Bộ Gỗ và Bộ Đồng để học sinh tự chọn.'
      ],
      correctIndex: 1,
      explanation: 'Chính xác! Như đã kiểm chứng ở Bài 5, dù thân kèn Saxophone làm bằng kim loại nhưng cơ chế phát âm dùng dăm kèn đơn nên thuộc Bộ Gỗ. Giáo viên bắt buộc đối chiếu SGK (Human-in-the-Loop) để chặn lỗi ảo giác của AI.'
    },
    {
      id: 'q2',
      tag: 'Minh bạch trong dự án nhóm (Bài 4)',
      question: 'Trong dự án Nhóm 10 ("AI & Công nghệ số trong giảng dạy Âm nhạc THCS"), một thành viên dùng ChatGPT viết trọn vẹn kịch bản tiết 40 phút rồi nộp trực tiếp vào báo cáo chung mà không chỉnh sửa hay ghi chú. Hành động này vi phạm điều gì?',
      options: [
        'Không vi phạm gì vì cả nhóm đang làm đề tài về AI.',
        'Chỉ vi phạm lỗi trình bày phông chữ trong Word.',
        'Vi phạm tính minh bạch nguồn AI và thiếu bước kiểm duyệt sư phạm (dễ khiến tiết học 40 phút bị quá tải hoặc thiếu gắn kết văn hóa Việt Nam).',
        'Vi phạm quy định về dung lượng tệp video MP4 trên Google Drive.'
      ],
      correctIndex: 2,
      explanation: 'Chính xác! Theo chuẩn liêm chính học thuật đại học và kinh nghiệm thực tế của Nhóm 10, mọi nội dung có AI hỗ trợ đều phải được ghi chú minh bạch và do thành viên tự biên tập để cân đối thời lượng thực tế.'
    },
    {
      id: 'q3',
      tag: 'Bảo mật dữ liệu học sinh',
      question: 'Khi thực tập sư phạm, bạn muốn dùng một công cụ AI công cộng để gợi ý mẫu nhận xét năng lực âm nhạc cuối kỳ. Thông tin nào TUYỆT ĐỐI KHÔNG được nhập vào khung chat AI?',
      options: [
        'Mức độ đạt chuẩn kiến thức kỹ năng theo chương trình Âm nhạc THCS.',
        'Tiêu chí đánh giá hát đúng cao độ, trường độ và khả năng giữ nhịp.',
        'Họ tên đầy đủ, mã định danh, số điện thoại phụ huynh và bảng điểm cá nhân thật của học sinh.',
        'Yêu cầu văn phong nhận xét khích lệ, tích cực khoảng 50 chữ.'
      ],
      correctIndex: 2,
      explanation: 'Tuyệt đối đúng! Dữ liệu định danh cá nhân (PII) của học sinh và sinh viên như họ tên thật, SĐT, CCCD, địa chỉ, bảng điểm gắn danh tính không bao giờ được tải lên các mô hình AI công cộng.'
    },
    {
      id: 'q4',
      tag: 'Bản quyền & Sở hữu trí tuệ Âm nhạc',
      question: 'Bạn dùng Suno AI tạo đoạn nhạc nền 30 giây và dùng Moises tách phần đệm từ một ca khúc mẫu để minh họa cho bài thuyết trình học phần INF2501. Cách ghi nhận nào thể hiện liêm chính học thuật?',
      options: [
        'Ghi tên mình là tác giả phối khí để bài thuyết trình thêm ấn tượng.',
        'Không cần ghi chú gì vì chỉ dùng trong phạm vi lớp học.',
        'Ghi chú minh bạch: đoạn nhạc nền tạo hỗ trợ bởi Suno AI, phần tách beat thực hiện qua Moises từ tác phẩm gốc (nêu rõ tên tác giả/bài hát), chỉ phục vụ minh họa học tập.',
        'Tải lên nền tảng thương mại để kiếm tiền mà không xin phép.'
      ],
      correctIndex: 2,
      explanation: 'Chuẩn xác! Trong Sư phạm Âm nhạc, việc tôn trọng tác quyền ca khúc gốc và công bố rõ công cụ AI tạo/tách âm thanh (Suno AI, Moises) là yêu cầu cốt lõi về đạo đức nghề nghiệp và liêm chính số.'
    },
    {
      id: 'q5',
      tag: 'Chính sách AI tại trường Đại học',
      question: 'Nếu quy chế học phần quy định "AI được phép hỗ trợ ở mức lên ý tưởng và rà soát diễn đạt (Assistive), không được viết thay nội dung phản ánh cá nhân", lựa chọn nào sau đây là phù hợp cho trang Tổng kết Portfolio?',
      options: [
        'Nhờ AI viết hộ toàn bộ phần cảm nhận cá nhân và nộp nguyên văn.',
        'Tự viết trải nghiệm thực tế của bản thân (ví dụ khó khăn đồng bộ iOS/Android/Windows của Nhóm 10), có thể dùng AI kiểm tra chính tả và ghi chú rõ vai trò hỗ trợ của AI.',
        'Sao chép phần tổng kết của bạn cùng nhóm và đổi tên sinh viên.',
        'Không viết phần cảm nhận cá nhân nữa.'
      ],
      correctIndex: 1,
      explanation: 'Chính xác! Phần cảm nhận và đúc kết cá nhân đòi hỏi trải nghiệm chân thực của chính sinh viên; AI chỉ nên đóng vai trò hỗ trợ rà soát ngôn từ khi được phép và luôn phải minh bạch.'
    },
    {
      id: 'q6',
      tag: 'Xác thực nguồn trích dẫn học thuật (Bài 2)',
      question: 'Khi tìm tài liệu cho tiểu luận về "AI trong Giáo dục Âm nhạc", ChatGPT liệt kê 3 bài báo khoa học kèm tên tạp chí Oxford Academic và mã DOI rất thuyết phục. Bạn cần làm gì trước khi đưa vào danh mục tài liệu tham khảo Harvard?',
      options: [
        'Tin tưởng hoàn toàn và chép thẳng vào danh mục tài liệu tham khảo.',
        'Chỉ đổi năm xuất bản cho mới hơn rồi trích dẫn.',
        'Tra cứu trực tiếp tên bài báo và mã DOI trên Google Scholar, Oxford Academic hoặc Sage Journals để xác minh bài báo có thật và đọc nội dung gốc trước khi trích dẫn.',
        'Xóa tên tác giả đi chỉ giữ tên tạp chí.'
      ],
      correctIndex: 2,
      explanation: 'Tuyệt vời! Mô hình ngôn ngữ lớn thường tự ghép tên tác giả, tạp chí và mã DOI giả (citation hallucination). Bạn luôn phải kiểm chứng nguồn gốc trên CSDL học thuật uy tín trước khi trích dẫn.'
    }
  ];

  function initFlipCards() {
    var grid = document.getElementById('principlesFlipGrid');
    var progressEl = document.getElementById('flipProgressText');
    var flipAllBtn = document.getElementById('flipAllBtn');
    var resetAllBtn = document.getElementById('resetFlipBtn');
    if (!grid) return;

    var exploredSet = new Set();

    function updateProgress() {
      if (progressEl) {
        progressEl.textContent = 'Đã khám phá ' + exploredSet.size + '/' + PRINCIPLES.length + ' nguyên tắc (nhấn vào thẻ để lật)';
      }
    }

    grid.innerHTML = '';
    PRINCIPLES.forEach(function (item, idx) {
      var card = document.createElement('div');
      card.className = 'flip-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-pressed', 'false');
      card.setAttribute('aria-label', 'Nguyên tắc ' + item.num + ': ' + item.title + '. Nhấn để lật xem chi tiết.');

      card.innerHTML =
        '<div class="flip-card-inner">' +
          '<div class="flip-card-front">' +
            '<div>' +
              '<div class="flip-card-front-top">' +
                '<span class="flip-num">Nguyên tắc ' + item.num + '</span>' +
                '<span class="flip-icon" aria-hidden="true">' + item.icon + '</span>' +
              '</div>' +
              '<h4>' + item.title + '</h4>' +
              '<p>' + item.shortDesc + '</p>' +
            '</div>' +
            '<div class="flip-hint">↻ Nhấn hoặc gõ Enter để xem chi tiết &amp; ví dụ</div>' +
          '</div>' +
          '<div class="flip-card-back">' +
            '<div>' +
              '<h4>' + item.num + '. ' + item.title + '</h4>' +
              '<p>' + item.detail + '</p>' +
            '</div>' +
            '<div class="flip-example">' + item.example + '</div>' +
          '</div>' +
        '</div>';

      function toggleCard() {
        var isFlipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
        if (isFlipped) {
          exploredSet.add(idx);
          updateProgress();
        }
      }

      card.addEventListener('click', toggleCard);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCard();
        }
      });

      grid.appendChild(card);
    });

    if (flipAllBtn) {
      flipAllBtn.addEventListener('click', function () {
        var cards = grid.querySelectorAll('.flip-card');
        cards.forEach(function (c, i) {
          c.classList.add('is-flipped');
          c.setAttribute('aria-pressed', 'true');
          exploredSet.add(i);
        });
        updateProgress();
      });
    }

    if (resetAllBtn) {
      resetAllBtn.addEventListener('click', function () {
        var cards = grid.querySelectorAll('.flip-card');
        cards.forEach(function (c) {
          c.classList.remove('is-flipped');
          c.setAttribute('aria-pressed', 'false');
        });
      });
    }

    updateProgress();
  }

  function initEthicsQuiz() {
    var container = document.getElementById('ethicsQuizContainer');
    var statusText = document.getElementById('quizStatusText');
    var scoreText = document.getElementById('quizScoreText');
    var progressFill = document.getElementById('quizProgressFill');
    var summaryBox = document.getElementById('quizSummaryBox');
    var resetBtn = document.getElementById('resetQuizBtn');
    if (!container) return;

    var letters = ['A', 'B', 'C', 'D'];
    var answers = {};

    function updateStatus() {
      var answeredCount = Object.keys(answers).length;
      var correctCount = 0;
      QUIZ_QUESTIONS.forEach(function (q) {
        if (answers[q.id] === q.correctIndex) correctCount++;
      });

      if (statusText) {
        statusText.textContent = 'Tiến độ: ' + answeredCount + '/' + QUIZ_QUESTIONS.length + ' tình huống';
      }
      if (scoreText) {
        scoreText.textContent = 'Điểm hiện tại: ' + correctCount + '/' + QUIZ_QUESTIONS.length;
      }
      if (progressFill) {
        progressFill.style.width = Math.round((answeredCount / QUIZ_QUESTIONS.length) * 100) + '%';
      }

      if (summaryBox) {
        if (answeredCount === QUIZ_QUESTIONS.length) {
          var badgeTitle = '';
          var badgeDesc = '';
          if (correctCount === QUIZ_QUESTIONS.length) {
            badgeTitle = '🏆 Huy hiệu Vàng: Đại sứ Liêm chính Số & Sư phạm Âm nhạc';
            badgeDesc = 'Xuất sắc! Bạn nắm vững 100% quy tắc kiểm duyệt Human-in-the-Loop, minh bạch AI, bảo mật dữ liệu học sinh và tác quyền âm nhạc.';
          } else if (correctCount >= 4) {
            badgeTitle = '🎖️ Huy hiệu Bạc: Sinh viên Thực hành AI Có Trách nhiệm';
            badgeDesc = 'Rất tốt! Bạn đã hiểu các nguyên tắc cốt lõi về liêm chính học thuật; hãy xem lại các giải thích ở câu chưa đúng để đạt mức tuyệt đối.';
          } else {
            badgeTitle = '📘 Chứng nhận Tham gia: Cần củng cố Nguyên tắc Kiểm duyệt AI';
            badgeDesc = 'Bạn hãy đọc lại 7 thẻ nguyên tắc phía trên và thử làm lại trắc nghiệm để rèn phản xạ nhận diện rủi ro đạo đức AI.';
          }

          summaryBox.hidden = false;
          summaryBox.innerHTML =
            '<div class="quiz-summary-card">' +
              '<h4>Kết quả Trắc nghiệm Liêm chính Học thuật: ' + correctCount + '/' + QUIZ_QUESTIONS.length + ' câu đúng (' + Math.round((correctCount / QUIZ_QUESTIONS.length) * 100) + '%)</h4>' +
              '<p>' + badgeDesc + '</p>' +
              '<div class="integrity-badge-card">' +
                '<div class="integrity-seal">' +
                  '<span class="integrity-seal-icon" aria-hidden="true">✓</span>' +
                  '<div>' +
                    '<div>' + badgeTitle + '</div>' +
                    '<div style="font-size:0.83rem; font-weight:400; color:#cbd5e1;">Xác nhận hoàn thành cam kết sử dụng AI có trách nhiệm • Học phần INF2501 — Tô Đức Thịnh (K20G)</div>' +
                  '</div>' +
                '</div>' +
                '<button type="button" class="btn btn-primary btn-sm" id="summaryRetryBtn">Làm lại trắc nghiệm ↻</button>' +
              '</div>' +
            '</div>';

          var retryInside = document.getElementById('summaryRetryBtn');
          if (retryInside) {
            retryInside.addEventListener('click', renderQuiz);
          }
        } else {
          summaryBox.hidden = true;
          summaryBox.innerHTML = '';
        }
      }
    }

    function renderQuiz() {
      answers = {};
      container.innerHTML = '';

      QUIZ_QUESTIONS.forEach(function (q, qIndex) {
        var card = document.createElement('article');
        card.className = 'quiz-question-card';
        card.id = 'quiz-' + q.id;

        var header = document.createElement('div');
        header.className = 'quiz-q-header';
        header.innerHTML =
          '<span class="badge badge-navy">Tình huống ' + (qIndex + 1) + '/' + QUIZ_QUESTIONS.length + '</span>' +
          '<span class="badge badge-teal">' + q.tag + '</span>';

        var title = document.createElement('h4');
        title.className = 'quiz-q-title';
        title.textContent = q.question;

        var optionsWrap = document.createElement('div');
        optionsWrap.className = 'quiz-options';

        var feedback = document.createElement('div');
        feedback.className = 'quiz-feedback';
        feedback.setAttribute('aria-live', 'polite');

        q.options.forEach(function (optText, optIdx) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'quiz-option-btn';
          btn.innerHTML =
            '<span class="quiz-option-letter">' + letters[optIdx] + '</span>' +
            '<span>' + optText + '</span>';

          btn.addEventListener('click', function () {
            if (answers.hasOwnProperty(q.id)) return;
            answers[q.id] = optIdx;

            var allBtns = optionsWrap.querySelectorAll('.quiz-option-btn');
            allBtns.forEach(function (b, idx) {
              b.disabled = true;
              if (idx === q.correctIndex) {
                b.classList.add('is-correct');
              } else if (idx === optIdx) {
                b.classList.add('is-wrong');
              }
            });

            var isRight = optIdx === q.correctIndex;
            feedback.className = 'quiz-feedback is-visible ' + (isRight ? 'feedback-ok' : 'feedback-err');
            feedback.innerHTML =
              '<strong>' + (isRight ? '✓ Chính xác! ' : '✕ Chưa chính xác. ') + '</strong>' +
              q.explanation;

            updateStatus();
          });

          optionsWrap.appendChild(btn);
        });

        card.appendChild(header);
        card.appendChild(title);
        card.appendChild(optionsWrap);
        card.appendChild(feedback);
        container.appendChild(card);
      });

      updateStatus();
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', renderQuiz);
    }

    renderQuiz();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initFlipCards();
    initEthicsQuiz();
  });
})();
