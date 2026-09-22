let currentStep = 0;

let audioContext;

let voiceEnabled = false;


/* ================= AUDIO SYSTEM ================= */

function initAudio() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
    }

    if (audioContext.state === "suspended") {

        audioContext.resume();
    }
}


/* ================= SOUND EFFECT ================= */

function playTone(
    frequency = 600,
    duration = 0.12,
    type = "sine",
    volume = 0.04
) {

    if (!audioContext) return;

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.type = type;

    oscillator.frequency.value =
        frequency;


    gain.gain.setValueAtTime(
        volume,
        audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration
    );


    oscillator.connect(gain);

    gain.connect(audioContext.destination);


    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + duration
    );
}


/* ================= CLICK SOUND ================= */

function clickSound() {

    playTone(
        700,
        0.12,
        "sine",
        0.05
    );
}


/* ================= STEP SOUND ================= */

function stepSound() {

    playTone(
        450,
        0.15,
        "triangle",
        0.05
    );

    setTimeout(() => {

        playTone(
            750,
            0.2,
            "triangle",
            0.04
        );

    }, 100);
}


/* ================= FINAL SOUND ================= */

function finalSound() {

    playTone(
        300,
        0.3,
        "sine",
        0.04
    );

    setTimeout(() => {

        playTone(
            500,
            0.3,
            "sine",
            0.05
        );

    }, 200);

    setTimeout(() => {

        playTone(
            900,
            0.7,
            "sine",
            0.06
        );

    }, 400);
}


/* ================= VOICE OVER ================= */

function speak(text, rate = 0.9) {

    if (!("speechSynthesis" in window)) {
        return;
    }


    window.speechSynthesis.cancel();


    const voice =
        new SpeechSynthesisUtterance(text);


    voice.lang = "en-US";

    voice.rate = rate;

    voice.pitch = 1;

    voice.volume = 1;


    window.speechSynthesis.speak(voice);
}


/* ================= START ================= */

function startJourney() {

    initAudio();

    voiceEnabled = true;

    clickSound();


    speak(
        "Before there were calculators... before there were computers... there were numbers.",
        0.82
    );


    document
        .getElementById("intro")
        .classList
        .remove("active");


    setTimeout(() => {

        document
            .getElementById("journey")
            .classList
            .add("active");

    }, 900);
}


/* ================= STEP DATA ================= */

const steps = {

    1: {

        title:
            "ONE — ANCIENT MATHEMATICS",

        subtitle:
            "The beginning of counting, numbers and human curiosity.",

        voice:
            "From the simplest count, mathematics began to take shape.",

        content: `

            <div class="step-number">
                01
            </div>

            <h3>
                ONE — ANCIENT MATHEMATICS
            </h3>

            <p>

                Long before calculators and computers,
                humans began with something simple —
                <b>counting.</b>

                <br><br>

                From marks and symbols to the first ideas
                of numbers, mathematics began its journey
                with <b>ONE.</b>

            </p>
        `
    },


    2: {

        title:
            "TWO — THE EVOLUTION",

        subtitle:
            "From simple numbers to the mathematics behind technology.",

        voice:
            "From numbers to geometry, from calculations to computers... mathematics evolved with us.",

        content: `

            <div class="step-number">
                02
            </div>

            <h3>
                TWO — THE EVOLUTION
            </h3>

            <p>

                Mathematics grew beyond counting.

                <br><br>

                <b>Numbers</b> led to
                <b>Geometry</b>,

                Geometry shaped
                <b>Calculators</b>,

                and calculations eventually powered
                <b>Computers.</b>

            </p>
        `
    },


    3: {

        title:
            "THREE — MATHEMATICS AROUND US",

        subtitle:
            "Mathematics is not just a subject. It is everywhere.",

        voice:
            "And today, mathematics lives around us — in time, in nature, in architecture, and in technology.",

        content: `

            <div class="step-number">
                03
            </div>

            <h3>
                THREE — MATHEMATICS AROUND US
            </h3>

            <p>

                Look around.

                <br><br>

                Mathematics is present in
                <b>Time</b>,
                <b>Nature</b>,
                <b>Architecture</b>
                and
                <b>Technology.</b>

                <br><br>

                It quietly shapes the world we live in.

            </p>
        `
    }

};


/* ================= OPEN STEP ================= */

function openStep(step) {

    if (step !== currentStep + 1) {
        return;
    }


    currentStep = step;

    const data = steps[step];


    clickSound();


    document
        .getElementById("journeyTitle")
        .innerText = data.title;


    document
        .getElementById("journeySubtitle")
        .innerText = data.subtitle;


    const content =
        document.getElementById(
            "stepContent"
        );


    content.innerHTML =
        data.content;


    content.style.animation = "none";

    void content.offsetWidth;

    content.style.animation =
        "cardAppear .6s ease";


    stepSound();


    if (voiceEnabled) {

        setTimeout(() => {

            speak(
                data.voice,
                0.88
            );

        }, 400);

    }


    document
        .getElementById("continueBtn")
        .classList
        .remove("hidden");


    if (step < 3) {

        const nextButton =
            document.getElementById(
                "num" + (step + 1)
            );


        nextButton.disabled = false;

        nextButton.classList
            .remove("locked");
    }
}


/* ================= CONTINUE ================= */

function completeStep() {

    clickSound();


    if (currentStep < 3) {

        const nextStep =
            currentStep + 1;


        openStep(nextStep);

    }

    else {

        showFinalReveal();

    }
}


/* ================= FINAL REVEAL ================= */

function showFinalReveal() {

    document
        .getElementById("journey")
        .classList
        .remove("active");


    setTimeout(() => {

        document
            .getElementById("finalReveal")
            .classList
            .add("active");


        finalSound();


        setTimeout(() => {

            speak(
                "And after travelling through time, numbers have brought us to one special destination...",
                0.82
            );

        }, 600);


        setTimeout(() => {

            document
                .getElementById("finalReveal")
                .classList
                .remove("active");


            document
                .getElementById("invitationScreen")
                .classList
                .add("active");

        }, 5200);

    }, 800);
}
