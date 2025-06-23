'use strict';
        const nameInput = document.getElementById('name');
        const lastnameInput = document.getElementById('lastname');
        const numberInput = document.getElementById('number');
        const submitRegister = document.getElementById('submit-register');
        const quizPage = document.getElementById('quizPage');
        const questionEl = document.getElementById('question');
        const quizAnswer = document.getElementById('quizAnswer');
        const submitAnswer = document.getElementById('submitAnswer');
        const feedbackEl = document.getElementById('feedback');
        const resultPage = document.getElementById('resultPage');
        const finalScoreEl = document.getElementById('finalScore');
        const downloadResultBtn = document.getElementById('downloadResult');
        const registerPage = document.getElementById('registerpage');
        async function sha256(text) {
            const data = new TextEncoder().encode(text);
            const hash = await crypto.subtle.digest("SHA-256", data);
            return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
        }
const questions = QUESTIONS;
        let quizQuestions = [];
        function generateQuizQuestions() {
            if (questions.length >= 10) {
                quizQuestions = shuffleArray(questions).slice(0, 10);
            } else {
                quizQuestions = shuffleArray(questions);
                return;
                while (quizQuestions.length < 10) {
                    quizQuestions.push(questions[Math.floor(Math.random() * questions.length)]);
                }
            }
        }
        function shuffleArray(array) {
            return array.sort(() => Math.random() - 0.5);
        }
        let score = 0;
        let currentQuestion = 0;
        document.addEventListener('DOMContentLoaded', () => {
            registerPage.style.display = 'none';
            quizPage.style.display = 'none';
            resultPage.style.display = 'none';
            const loadingContainer = document.querySelector('.container');
            loadingContainer.style.display = 'block';
            loadingContainer.style.opacity = '0';
            setTimeout(() => {
                loadingContainer.style.transition = 'opacity 0.5s ease';
                loadingContainer.style.opacity = '1';
            }, 100);
            setTimeout(() => {
                loadingContainer.style.transition = 'opacity 0.5s ease';
                loadingContainer.style.opacity = '0';
                setTimeout(() => {
                    loadingContainer.style.display = 'none';
                    registerPage.style.display = 'flex';
                    registerPage.classList.add('fade-in-up');
                    setTimeout(() => {
                        registerPage.classList.remove('fade-in-up');
                    }, 600);
                    validateRegisterInputs();
                }, 500);
            }, 3000);
        });
        function validateRegisterInputs() {
            const allInputs = [nameInput, lastnameInput, numberInput];
            const isValid = allInputs.every(input => input.value.trim() !== '');
            submitRegister.disabled = !isValid;
            submitRegister.style.opacity = isValid ? '1' : '0.5';
            submitRegister.style.cursor = isValid ? 'pointer' : 'not-allowed';
        }
        [nameInput, lastnameInput, numberInput].forEach(input => {
            input.addEventListener('input', validateRegisterInputs);
        });
        function validateRegisterInputs() {
            const allInputs = [nameInput, lastnameInput, numberInput];
            const isValid = allInputs.every(input => input.value.trim() !== '');
            submitRegister.disabled = !isValid;
            submitRegister.style.opacity = isValid ? '1' : '0.5';
            submitRegister.style.cursor = isValid ? 'pointer' : 'not-allowed';
        }
        [nameInput, lastnameInput, numberInput].forEach(input => {
            input.addEventListener('input', validateRegisterInputs);
        });
        submitRegister.addEventListener('click', () => {
            if (submitRegister.disabled) return;
            setTimeout(() => {
                registerPage.style.transition = 'opacity 0.5s ease';
                registerPage.style.opacity = '0';
                setTimeout(() => {
                    registerPage.style.display = 'none';
                    quizPage.style.display = 'flex';
                    quizPage.style.opacity = '0';
                    quizPage.style.transition = 'opacity 0.5s ease';
                    quizPage.classList.add('fade-in-up');
                    setTimeout(() => {
                        quizPage.classList.remove('fade-in-up');
                    }, 600);
                    setTimeout(() => {
                        quizPage.style.opacity = '1';
                    }, 100);
                    startQuiz();
                }, 500);
            }, 2000);
        });
        function startQuiz() {
            currentQuestion = 0;
            score = 0;
            feedbackEl.textContent = '';
            generateQuizQuestions();
            quizPage.style.display = 'flex';
            quizPage.style.opacity = '1';
            startTimer();
            displayQuestion();
        }
        function displayQuestion() {
            if (currentQuestion < quizQuestions.length) {
                const q = quizQuestions[currentQuestion];
                questionEl.textContent = q.sentence;
                quizAnswer.value = '';
                quizAnswer.focus();
                feedbackEl.textContent = '';
            }
        }
        function validateQuizAnswer() {
            const isValid = quizAnswer.value.trim() !== '';
            submitAnswer.disabled = !isValid;
            submitAnswer.style.opacity = isValid ? '1' : '0.5';
            submitAnswer.style.cursor = isValid ? 'pointer' : 'not-allowed';
        }
        quizAnswer.addEventListener('input', validateQuizAnswer);
        validateQuizAnswer();
        submitAnswer.addEventListener('click', async () => {
            if (submitAnswer.disabled) return;
            const userAnswer = quizAnswer.value.trim().toLowerCase();
            if (userAnswer === "") {
                feedbackEl.textContent = "Please enter an answer.";
                return;
            }
            const delayTime = 500;
            const userHash = await sha256(userAnswer);
            const correctHash = quizQuestions[currentQuestion].answerHash;
            if (userHash === correctHash) {
                score++;
            } else {
            }
            currentQuestion++;
            if (currentQuestion < quizQuestions.length) {
                questionEl.style.transition = 'opacity 0.5s ease';
                quizAnswer.style.transition = 'opacity 0.5s ease';
                feedbackEl.style.transition = 'opacity 0.5s ease';
                questionEl.style.opacity = '0';
                quizAnswer.style.opacity = '0';
                feedbackEl.style.opacity = '0';
                setTimeout(() => {
                    displayQuestion();
                    questionEl.style.opacity = '1';
                    quizAnswer.style.opacity = '1';
                    feedbackEl.style.opacity = '1';
                }, delayTime);
            } else {
                setTimeout(showResult, delayTime);
            }
        });
        quizAnswer.addEventListener('input', () => {
            const isValid = quizAnswer.value.trim() !== '';
            submitAnswer.disabled = !isValid;
            submitAnswer.style.opacity = isValid ? '1' : '0.5';
            submitAnswer.style.cursor = isValid ? 'pointer' : 'not-allowed';
        });
        submitAnswer.disabled = true;
        submitAnswer.style.opacity = '0.5';
        submitAnswer.style.cursor = 'not-allowed';
        function showResult() {
            clearInterval(timerInterval);
            quizPage.style.opacity = '0';
            setTimeout(() => {
                quizPage.style.display = 'none';
                finalScoreEl.textContent = `Hi ${nameInput.value} ${lastnameInput.value}, your score is ${score} out of ${quizQuestions.length}.`;
                resultPage.style.display = 'flex';
                resultPage.style.opacity = '1';
                resultPage.classList.add('fade-in-up');
                setTimeout(() => {
                    resultPage.classList.remove('fade-in-up');
                }, 600);
            }, 500);
        }
        downloadResultBtn.addEventListener('click', () => {
            const canvas = document.createElement('canvas');
            canvas.width = 1200;
            canvas.height = 800;
            const ctx = canvas.getContext('2d');
            const bgGradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 100, canvas.width / 2, canvas.height / 2, 600);
            bgGradient.addColorStop(0, '#fdfaf6');
            bgGradient.addColorStop(1, '#e8e1d7');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const noiseCanvas = document.createElement('canvas');
            noiseCanvas.width = canvas.width;
            noiseCanvas.height = canvas.height;
            const noiseCtx = noiseCanvas.getContext('2d');
            const noiseData = noiseCtx.createImageData(canvas.width, canvas.height);
            for (let i = 0; i < noiseData.data.length; i += 4) {
                const v = Math.floor(Math.random() * 255);
                noiseData.data[i] = v;
                noiseData.data[i + 1] = v;
                noiseData.data[i + 2] = v;
                noiseData.data[i + 3] = 15;
            }
            noiseCtx.putImageData(noiseData, 0, 0);
            ctx.drawImage(noiseCanvas, 0, 0);
            const outerGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            outerGradient.addColorStop(0, '#DAA520');
            outerGradient.addColorStop(1, '#FFD700');
            ctx.strokeStyle = outerGradient;
            ctx.lineWidth = 20;
            ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
            ctx.strokeStyle = outerGradient;
            ctx.lineWidth = 4;
            ctx.setLineDash([20, 15]);
            ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
            ctx.setLineDash([]);
            function drawOrnateCorner(x, y, angle) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);
                ctx.strokeStyle = outerGradient;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-40, -40, -100, 40, 0, 80);
                ctx.bezierCurveTo(100, 40, 40, -40, 0, 0);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-20, 20);
                ctx.quadraticCurveTo(-40, 30, -30, 50);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(20, 20);
                ctx.quadraticCurveTo(40, 30, 30, 50);
                ctx.stroke();
                for (let i = 0; i < 2; i++) {
                    ctx.beginPath();
                    ctx.arc(i === 0 ? -25 : 25, 25, 10, 0, Math.PI * 2);
                    ctx.stroke();
                }
                ctx.fillStyle = '#DAA520';
                [[-40, 0], [40, 0], [0, 40], [0, 60]].forEach(([dx, dy]) => {
                    ctx.beginPath();
                    ctx.arc(dx, dy, 3, 0, Math.PI * 2);
                    ctx.fill();
                });
                ctx.restore();
            }
            ctx.lineWidth = 3;
            drawOrnateCorner(20, 20, 0);
            drawOrnateCorner(canvas.width - 20, 20, Math.PI / 2);
            drawOrnateCorner(20, canvas.height - 20, -Math.PI / 2);
            drawOrnateCorner(canvas.width - 20, canvas.height - 20, Math.PI);
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = '#333';
            ctx.font = "bold 60px 'Kanit', sans-serif";
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#fff";
            ctx.strokeText("Score Confirmation", canvas.width / 2, 140);
            ctx.fillText("Score Confirmation", canvas.width / 2, 140);
            ctx.font = "36px 'Kanit', sans-serif";
            ctx.strokeText("Tester Name", canvas.width / 2, 220);
            ctx.fillText("Tester Name", canvas.width / 2, 220);
            ctx.font = "bold 52px 'Kanit', sans-serif";
            ctx.strokeText(`${nameInput.value} ${lastnameInput.value}`, canvas.width / 2, 300);
            ctx.fillText(`${nameInput.value} ${lastnameInput.value}`, canvas.width / 2, 300);
            ctx.font = "36px 'Kanit', sans-serif";
            ctx.strokeText(`Test Score: ${score} / ${quizQuestions.length}`, canvas.width / 2, 380);
            ctx.fillText(`Test Score: ${score} / ${quizQuestions.length}`, canvas.width / 2, 380);
            ctx.font = "32px 'Kanit', sans-serif";
            ctx.strokeText(`No.${numberInput.value}`, canvas.width / 2, 460);
            ctx.fillText(`No.${numberInput.value}`, canvas.width / 2, 460);
            ctx.strokeText(`Testing data: ${new Date().toLocaleString()}`, canvas.width / 2, 520);
            ctx.fillText(`Testing data: ${new Date().toLocaleString()}`, canvas.width / 2, 520);
            ctx.save();
            ctx.globalAlpha = 0.12;
            ctx.font = "bold 100px 'Kanit', sans-serif";
            ctx.fillStyle = "#333";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            for (let i = -1; i <= 3; i++) {
                for (let j = -1; j <= 3; j++) {
                    ctx.save();
                    ctx.translate(canvas.width / 2 + i * 350, canvas.height / 2.7 + j * 250);
                    ctx.rotate(-Math.PI / 8);
                    ctx.fillText("© Teacher Sopa", 0, 0);
                    ctx.restore();
                }
            }
            ctx.restore();
            const dataURL = canvas.toDataURL("image/png");
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataURL);
            downloadAnchorNode.setAttribute("download", "quiz_certificate.png");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        });
        let totalTime = 10 * 60;
        let timerInterval;
        function startTimer() {
            timerInterval = setInterval(() => {
                totalTime--;
                let minutes = Math.floor(totalTime / 60);
                let seconds = totalTime % 60;
                document.getElementById('timer').textContent =
                    `Time Left: ${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
                if (totalTime <= 0) {
                    clearInterval(timerInterval);
                    showResult();
                }
            }, 1000);
        }
