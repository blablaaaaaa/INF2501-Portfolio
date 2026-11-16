/* ==========================================================================
   INF2501 Portfolio — Interactive Prompt Optimizer (Bài 3)
   File: js/prompt-optimizer.js
   Author: Tô Đức Thịnh (MSSV: 2552210375 | K20G | Sư phạm Âm nhạc)
   ========================================================================== */

(function () {
  'use strict';

  var PRESETS = {
    lesson: {
      label: 'Giáo án Âm nhạc lớp 6',
      basicPrompt: 'Hãy thiết kế trò chơi khởi động cho bài Giới thiệu nhạc cụ phương Tây lớp 6.',
      role: 'Chuyên gia Sư phạm Âm nhạc THCS có 10 năm kinh nghiệm giảng dạy theo Chương trình GDPT 2018',
      context: 'Soạn hoạt động Khởi động (5 phút) cho tiết Âm nhạc lớp 6 (45 phút), chủ đề "Giới thiệu nhạc cụ phương Tây" (4 bộ: Dây, Gỗ, Đồng, Gõ). Lớp học có loa và máy chiếu, không có nhạc cụ giao hưởng thật.',
      task: 'Thiết kế trò chơi "Lắng nghe giai điệu ẩn danh" gồm: mục tiêu, 4 đoạn âm thanh mẫu (Piano, Violin, Flute, Trumpet), luật chơi 3 bước rõ ràng và lời dẫn kết nối vào bài mới giàu cảm xúc.',
      format: 'Bảng kế hoạch 3 cột (Thời lượng | Hoạt động của GV | Hoạt động của HS) kèm đoạn lời dẫn mẫu khoảng 100 chữ.',
      constraints: 'Không đề xuất giấu nhạc cụ thật sau lưng vì thiếu thực tế ở lớp học phổ thông; tuân thủ phân loại nhạc cụ theo SGK Âm nhạc 6 (lưu ý Saxophone thuộc Bộ Gỗ); văn phong gần gũi học sinh 11–12 tuổi.',
      cot: true,
      fewShot: true,
      selfReview: true
    },
    summary: {
      label: 'Tóm tắt tài liệu học thuật',
      basicPrompt: 'Tóm tắt bài báo về AI trong giáo dục âm nhạc giúp tôi.',
      role: 'Giảng viên nghiên cứu Phương pháp dạy học Âm nhạc và Công nghệ giáo dục',
      context: 'Sinh viên năm nhất ngành Sư phạm Âm nhạc đang đọc bài tổng quan hệ thống (Scoping Review) tiếng Anh về ứng dụng AI trong lớp học âm nhạc để làm tổng quan tài liệu cho học phần INF2501.',
      task: 'Tóm tắt các phát hiện chính của bài báo theo 4 trục: (1) Mục tiêu & phương pháp nghiên cứu, (2) Các nhóm công cụ AI tiêu biểu, (3) Hiệu quả sư phạm đo lường được, (4) Hạn chế và khoảng trống nghiên cứu.',
      format: 'Tối đa 250 từ tiếng Việt; trình bày gồm 1 câu luận điểm trung tâm + bảng tóm tắt 4 dòng + 3 từ khóa chuyên ngành kèm giải thích ngắn.',
      constraints: 'Chỉ tổng hợp từ văn bản người dùng cung cấp; không tự bịa số liệu, tên tác giả hay DOI nếu không xuất hiện trong bài; giữ nguyên thuật ngữ tiếng Anh chuyên ngành trong ngoặc đơn.',
      cot: true,
      fewShot: false,
      selfReview: true
    },
    concept: {
      label: 'Giải thích khái niệm Âm nhạc',
      basicPrompt: 'Giải thích tại sao kèn Saxophone lại thuộc Bộ Gỗ mà không phải Bộ Đồng?',
      role: 'Giảng viên Nhạc cụ học và Dàn nhạc giao hưởng tại trường Đại học Sư phạm Nghệ thuật',
      context: 'Học sinh lớp 6 và sinh viên năm nhất thường nhầm lẫn kèn Saxophone thuộc Bộ Đồng vì thân kèn làm bằng đồng thau sáng bóng.',
      task: 'Giải thích bản chất phân loại nhạc cụ hơi (dựa vào nguyên lý tạo âm thanh thay vì vật liệu vỏ kèn), đối chiếu trực tiếp Saxophone (dăm đơn) với Flute, Clarinet và Trumpet.',
      format: 'Giải thích 2 tầng: (1) Đoạn ví von dễ hiểu cho học sinh lớp 6 (~100 chữ), (2) Bảng đối chiếu kỹ thuật 3 tiêu chí (Cơ chế phát âm | Vật liệu thân | Bộ nhạc cụ) cho giáo viên.',
      constraints: 'Sử dụng thuật ngữ chính xác (dăm đơn / single reed, vành môi / embouchure); có 1 câu hỏi kiểm tra hiểu bài ở cuối.',
      cot: true,
      fewShot: true,
      selfReview: true
    },
    quiz: {
      label: 'Tạo bộ câu hỏi ôn tập',
      basicPrompt: 'Tạo 5 câu hỏi trắc nghiệm về 4 bộ nhạc cụ phương Tây.',
      role: 'Chuyên gia khảo thí giáo dục Âm nhạc THCS',
      context: 'Kiểm tra nhanh 10 phút cuối tiết Âm nhạc lớp 6 sau khi học xong 4 bộ nhạc cụ phương Tây (Bộ Dây, Bộ Gỗ, Bộ Đồng, Bộ Gõ) và xem trích đoạn dàn nhạc giao hưởng.',
      task: 'Biên soạn 6 câu hỏi trắc nghiệm 4 lựa chọn (A, B, C, D) phân bổ theo thang Bloom: 2 câu Nhận biết, 2 câu Thông hiểu, 2 câu Vận dụng tình huống nghe/phân biệt âm sắc.',
      format: 'Mỗi câu gồm: Nội dung câu hỏi + 4 đáp án + Đáp án đúng + Giải thích ngắn gọn 1–2 câu vì sao các đáp án còn lại sai.',
      constraints: 'Không tạo đáp án mơ hồ; lồng ghép ít nhất 1 câu bẫy kinh điển về kèn Saxophone hoặc Flute (thuộc Bộ Gỗ dù làm bằng kim loại).',
      cot: false,
      fewShot: true,
      selfReview: true
    }
  };

  function getEl(id) {
    return document.getElementById(id);
  }

  function evaluateQuality(state) {
    var score = 0;
    var tips = [];

    if (state.role.trim().length >= 12) {
      score += 18;
      tips.push({ ok: true, text: 'Đã xác định Vai trò (Role) chuyên môn rõ ràng (+18%).' });
    } else {
      tips.push({ ok: false, text: 'Thêm Vai trò (VD: Chuyên gia Sư phạm Âm nhạc) để định hình giọng văn (+18%).' });
    }

    if (state.context.trim().length >= 25) {
      score += 18;
      tips.push({ ok: true, text: 'Đã cung cấp Bối cảnh, đối tượng học tập cụ thể (+18%).' });
    } else {
      tips.push({ ok: false, text: 'Bổ sung Bối cảnh lớp học/môn học cụ thể hơn (+18%).' });
    }

    if (state.task.trim().length >= 20) {
      score += 20;
      tips.push({ ok: true, text: 'Nhiệm vụ cốt lõi chi tiết, có động từ hành động (+20%).' });
    } else {
      tips.push({ ok: false, text: 'Mô tả rõ đầu việc và nội dung cần AI tạo ra (+20%).' });
    }

    if (state.format.trim().length >= 12) {
      score += 14;
      tips.push({ ok: true, text: 'Đã quy định Định dạng & độ dài đầu ra (+14%).' });
    } else {
      tips.push({ ok: false, text: 'Chỉ rõ Định dạng (bảng, gạch đầu dòng, giới hạn số từ) (+14%).' });
    }

    if (state.constraints.trim().length >= 15) {
      score += 12;
      tips.push({ ok: true, text: 'Có Ràng buộc chống sai lệch/lạc đề (+12%).' });
    } else {
      tips.push({ ok: false, text: 'Thêm Ràng buộc để tránh AI bịa thông tin hoặc thiếu thực tế (+12%).' });
    }

    var techCount = (state.cot ? 1 : 0) + (state.fewShot ? 1 : 0) + (state.selfReview ? 1 : 0);
    score += techCount * 6;
    if (techCount === 3) {
      tips.push({ ok: true, text: 'Kết hợp đủ 3 kỹ thuật Prompt Engineering nâng cao (+18%).' });
    } else {
      tips.push({ ok: false, text: 'Bật thêm kỹ thuật CoT / Few-Shot / Tự kiểm chứng để đạt tối đa (+' + ((3 - techCount) * 6) + '%).' });
    }

    var tier = 'Chưa đạt';
    if (score >= 85) tier = 'Chuẩn Chuyên gia';
    else if (score >= 65) tier = 'Khá tốt';
    else if (score >= 40) tier = 'Cơ bản';

    return { score: Math.min(score, 100), tier: tier, tips: tips };
  }

  function buildOptimizedPrompt(state) {
    var lines = [];
    if (state.role.trim()) {
      lines.push('### VAI TRÒ (ROLE)\nHãy đóng vai: ' + state.role.trim() + '.');
    }
    if (state.context.trim()) {
      lines.push('### BỐI CẢNH (CONTEXT)\n' + state.context.trim());
    }
    if (state.task.trim()) {
      lines.push('### NHIỆM VỤ CẦN THỰC HIỆN (TASK)\n' + state.task.trim());
    }
    if (state.format.trim()) {
      lines.push('### ĐỊNH DẠNG ĐẦU RA (OUTPUT FORMAT)\n' + state.format.trim());
    }
    if (state.constraints.trim()) {
      lines.push('### RÀNG BUỘC CHUYÊN MÔN (CONSTRAINTS)\n' + state.constraints.trim());
    }

    var techniques = [];
    if (state.cot) {
      techniques.push('- [Chain-of-Thought] Hãy phân tích ngắn gọn các bước lập luận sư phạm trước khi đưa ra phương án cuối cùng.');
    }
    if (state.fewShot) {
      techniques.push('- [Few-Shot Example] Áp dụng cấu trúc mẫu chuẩn: [Mục tiêu rõ ràng] -> [Nội dung trọng tâm dễ hiểu] -> [Hoạt động tương tác kiểm chứng].');
    }
    if (state.selfReview) {
      techniques.push('- [Self-Review & Liêm chính] Cuối câu trả lời, tự kiểm tra xem có chi tiết nào thiếu thực tế lớp học hoặc cần giáo viên đối chiếu lại SGK/tài liệu gốc hay không.');
    }

    if (techniques.length > 0) {
      lines.push('### KỸ THUẬT TỐI ƯU ÁP DỤNG\n' + techniques.join('\n'));
    }

    if (lines.length === 0) {
      return 'Hãy nhập ít nhất Vai trò, Bối cảnh hoặc Nhiệm vụ ở cột bên trái để trình tối ưu sinh câu lệnh hoàn chỉnh...';
    }
    return lines.join('\n\n');
  }

  function deriveBasicPrompt(state) {
    if (state.activePreset && PRESETS[state.activePreset]) {
      return PRESETS[state.activePreset].basicPrompt;
    }
    var t = state.task.trim();
    if (!t) return 'Giúp tôi làm bài tập âm nhạc này.';
    var firstClause = t.split(/[.;\n]/)[0];
    return firstClause.length > 90 ? firstClause.slice(0, 90) + '...' : firstClause;
  }

  function initPromptOptimizer() {
    var shell = getEl('promptOptimizerApp');
    if (!shell) return;

    var elRole = getEl('optRole');
    var elContext = getEl('optContext');
    var elTask = getEl('optTask');
    var elFormat = getEl('optFormat');
    var elConstraints = getEl('optConstraints');
    var elCot = getEl('optTechCot');
    var elFewShot = getEl('optTechFewShot');
    var elSelfReview = getEl('optTechSelfReview');

    var elBasicOut = getEl('optBasicOutput');
    var elOptimizedOut = getEl('optOptimizedOutput');
    var elScoreVal = getEl('optScoreValue');
    var elScoreTier = getEl('optScoreTier');
    var elScoreBar = getEl('optScoreBar');
    var elTipsList = getEl('optTipsList');
    var elResetBtn = getEl('optResetBtn');
    var presetBtns = shell.querySelectorAll('.preset-btn');

    var activePreset = 'lesson';

    function readState() {
      return {
        activePreset: activePreset,
        role: elRole ? elRole.value : '',
        context: elContext ? elContext.value : '',
        task: elTask ? elTask.value : '',
        format: elFormat ? elFormat.value : '',
        constraints: elConstraints ? elConstraints.value : '',
        cot: elCot ? elCot.checked : false,
        fewShot: elFewShot ? elFewShot.checked : false,
        selfReview: elSelfReview ? elSelfReview.checked : false
      };
    }

    function render() {
      var state = readState();
      var evaluation = evaluateQuality(state);

      if (elBasicOut) {
        elBasicOut.textContent = deriveBasicPrompt(state);
      }
      if (elOptimizedOut) {
        elOptimizedOut.textContent = buildOptimizedPrompt(state);
      }
      if (elScoreVal) {
        elScoreVal.textContent = evaluation.score + '%';
      }
      if (elScoreTier) {
        elScoreTier.textContent = evaluation.tier;
      }
      if (elScoreBar) {
        elScoreBar.style.width = evaluation.score + '%';
        elScoreBar.setAttribute('aria-valuenow', String(evaluation.score));
      }
      if (elTipsList) {
        elTipsList.innerHTML = '';
        evaluation.tips.forEach(function (tip) {
          var li = document.createElement('li');
          li.className = tip.ok ? 'tip-ok' : 'tip-todo';
          li.textContent = (tip.ok ? '✓ ' : '• ') + tip.text;
          elTipsList.appendChild(li);
        });
      }
    }

    function applyPreset(key) {
      var p = PRESETS[key];
      if (!p) return;
      activePreset = key;
      if (elRole) elRole.value = p.role;
      if (elContext) elContext.value = p.context;
      if (elTask) elTask.value = p.task;
      if (elFormat) elFormat.value = p.format;
      if (elConstraints) elConstraints.value = p.constraints;
      if (elCot) elCot.checked = p.cot;
      if (elFewShot) elFewShot.checked = p.fewShot;
      if (elSelfReview) elSelfReview.checked = p.selfReview;

      presetBtns.forEach(function (btn) {
        var isMatch = btn.getAttribute('data-preset') === key;
        btn.classList.toggle('active', isMatch);
        btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
      });

      render();
    }

    presetBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyPreset(btn.getAttribute('data-preset'));
      });
    });

    [elRole, elContext, elTask, elFormat, elConstraints].forEach(function (input) {
      if (!input) return;
      input.addEventListener('input', function () {
        activePreset = null;
        presetBtns.forEach(function (btn) {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        render();
      });
    });

    [elCot, elFewShot, elSelfReview].forEach(function (chk) {
      if (!chk) return;
      chk.addEventListener('change', render);
    });

    if (elResetBtn) {
      elResetBtn.addEventListener('click', function () {
        activePreset = null;
        if (elRole) elRole.value = '';
        if (elContext) elContext.value = '';
        if (elTask) elTask.value = '';
        if (elFormat) elFormat.value = '';
        if (elConstraints) elConstraints.value = '';
        if (elCot) elCot.checked = false;
        if (elFewShot) elFewShot.checked = false;
        if (elSelfReview) elSelfReview.checked = false;
        presetBtns.forEach(function (btn) {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        render();
      });
    }

    applyPreset('lesson');
  }

  document.addEventListener('DOMContentLoaded', initPromptOptimizer);
})();
