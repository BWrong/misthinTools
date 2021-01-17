<template>
  <div class="background">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped>
@keyframes move {
  100% {
    transform: translate3d(0, 0, 1px) rotate(360deg);
  }
}

.background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}

.background span {
  width: 1vmin;
  height: 1vmin;
  border-radius: 1vmin;
  backface-visibility: hidden;
  position: absolute;
  animation: move;
  animation-duration: 45;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.background span:nth-child(0) {
  color: #e45a84;
  top: 12%;
  left: 20%;
  animation-duration: 41s;
  animation-delay: -28s;
  transform-origin: 13vw 9vh;
  box-shadow: -2vmin 0 0.8791132827676638vmin currentColor;
}
.background span:nth-child(1) {
  color: #583c87;
  top: 23%;
  left: 11%;
  animation-duration: 36s;
  animation-delay: -36s;
  transform-origin: 14vw -8vh;
  box-shadow: 2vmin 0 0.5649050190617813vmin currentColor;
}
.background span:nth-child(2) {
  color: #583c87;
  top: 50%;
  left: 49%;
  animation-duration: 50s;
  animation-delay: -14s;
  transform-origin: 15vw -17vh;
  box-shadow: -2vmin 0 0.970872561566539vmin currentColor;
}
.background span:nth-child(3) {
  color: #ffacac;
  top: 93%;
  left: 14%;
  animation-duration: 18s;
  animation-delay: -7s;
  transform-origin: 13vw 18vh;
  box-shadow: 2vmin 0 0.5588183811786094vmin currentColor;
}
.background span:nth-child(4) {
  color: #583c87;
  top: 44%;
  left: 41%;
  animation-duration: 15s;
  animation-delay: -11s;
  transform-origin: 17vw -21vh;
  box-shadow: -2vmin 0 1.09400011307783vmin currentColor;
}
.background span:nth-child(5) {
  color: #e45a84;
  top: 61%;
  left: 55%;
  animation-duration: 14s;
  animation-delay: -5s;
  transform-origin: -21vw -1vh;
  box-shadow: -2vmin 0 0.8366974570194112vmin currentColor;
}
.background span:nth-child(6) {
  color: #e45a84;
  top: 89%;
  left: 24%;
  animation-duration: 53s;
  animation-delay: -48s;
  transform-origin: -3vw 2vh;
  box-shadow: 2vmin 0 0.6080416050687938vmin currentColor;
}
.background span:nth-child(7) {
  color: #583c87;
  top: 54%;
  left: 67%;
  animation-duration: 20s;
  animation-delay: -35s;
  transform-origin: -21vw -8vh;
  box-shadow: -2vmin 0 0.6899985328729568vmin currentColor;
}
.background span:nth-child(8) {
  color: #583c87;
  top: 72%;
  left: 2%;
  animation-duration: 24s;
  animation-delay: -25s;
  transform-origin: -6vw 19vh;
  box-shadow: -2vmin 0 0.9521645380892305vmin currentColor;
}
.background span:nth-child(9) {
  color: #583c87;
  top: 25%;
  left: 15%;
  animation-duration: 8s;
  animation-delay: -10s;
  transform-origin: 21vw 12vh;
  box-shadow: -2vmin 0 0.9149810073762579vmin currentColor;
}
.background span:nth-child(10) {
  color: #ffacac;
  top: 32%;
  left: 69%;
  animation-duration: 51s;
  animation-delay: -6s;
  transform-origin: 18vw 22vh;
  box-shadow: -2vmin 0 1.0754220381129087vmin currentColor;
}
.background span:nth-child(11) {
  color: #583c87;
  top: 79%;
  left: 48%;
  animation-duration: 22s;
  animation-delay: -17s;
  transform-origin: 14vw 23vh;
  box-shadow: 2vmin 0 1.2229355339457777vmin currentColor;
}
.background span:nth-child(12) {
  color: #583c87;
  top: 99%;
  left: 23%;
  animation-duration: 22s;
  animation-delay: -35s;
  transform-origin: -20vw -12vh;
  box-shadow: -2vmin 0 0.4819059880253451vmin currentColor;
}
.background span:nth-child(13) {
  color: #e45a84;
  top: 43%;
  left: 64%;
  animation-duration: 49s;
  animation-delay: -9s;
  transform-origin: -12vw -6vh;
  box-shadow: 2vmin 0 0.7108879193650988vmin currentColor;
}
.background span:nth-child(14) {
  color: #ffacac;
  top: 40%;
  left: 62%;
  animation-duration: 44s;
  animation-delay: -10s;
  transform-origin: 10vw 25vh;
  box-shadow: 2vmin 0 1.106011460213994vmin currentColor;
}
.background span:nth-child(15) {
  color: #583c87;
  top: 88%;
  left: 53%;
  animation-duration: 39s;
  animation-delay: -42s;
  transform-origin: 5vw -6vh;
  box-shadow: 2vmin 0 0.9626549790634098vmin currentColor;
}
.background span:nth-child(16) {
  color: #e45a84;
  top: 77%;
  left: 98%;
  animation-duration: 31s;
  animation-delay: -16s;
  transform-origin: 25vw 11vh;
  box-shadow: 2vmin 0 1.1381204914286713vmin currentColor;
}
.background span:nth-child(17) {
  color: #ffacac;
  top: 21%;
  left: 83%;
  animation-duration: 10s;
  animation-delay: -41s;
  transform-origin: 20vw 14vh;
  box-shadow: 2vmin 0 0.2666669063923983vmin currentColor;
}
.background span:nth-child(18) {
  color: #e45a84;
  top: 5%;
  left: 55%;
  animation-duration: 55s;
  animation-delay: -43s;
  transform-origin: 8vw 10vh;
  box-shadow: -2vmin 0 0.2813077107805879vmin currentColor;
}
.background span:nth-child(19) {
  color: #583c87;
  top: 61%;
  left: 97%;
  animation-duration: 18s;
  animation-delay: -5s;
  transform-origin: -17vw 20vh;
  box-shadow: -2vmin 0 0.5297144075926743vmin currentColor;
}
.background span:nth-child(20) {
  color: #583c87;
  top: 91%;
  left: 3%;
  animation-duration: 27s;
  animation-delay: -47s;
  transform-origin: -9vw 19vh;
  box-shadow: 2vmin 0 0.8765188667355055vmin currentColor;
}
.background span:nth-child(21) {
  color: #583c87;
  top: 35%;
  left: 34%;
  animation-duration: 14s;
  animation-delay: -26s;
  transform-origin: 16vw 12vh;
  box-shadow: -2vmin 0 0.996242145135477vmin currentColor;
}
.background span:nth-child(22) {
  color: #ffacac;
  top: 49%;
  left: 58%;
  animation-duration: 37s;
  animation-delay: -35s;
  transform-origin: 25vw -14vh;
  box-shadow: 2vmin 0 0.6217294445040289vmin currentColor;
}
.background span:nth-child(23) {
  color: #e45a84;
  top: 49%;
  left: 69%;
  animation-duration: 33s;
  animation-delay: -7s;
  transform-origin: -6vw -16vh;
  box-shadow: 2vmin 0 1.0887536536091942vmin currentColor;
}
.background span:nth-child(24) {
  color: #583c87;
  top: 13%;
  left: 90%;
  animation-duration: 55s;
  animation-delay: -29s;
  transform-origin: 22vw -22vh;
  box-shadow: -2vmin 0 0.9103381971298019vmin currentColor;
}
.background span:nth-child(25) {
  color: #ffacac;
  top: 60%;
  left: 63%;
  animation-duration: 43s;
  animation-delay: -6s;
  transform-origin: 7vw -1vh;
  box-shadow: -2vmin 0 1.1026705569385011vmin currentColor;
}
.background span:nth-child(26) {
  color: #ffacac;
  top: 23%;
  left: 22%;
  animation-duration: 36s;
  animation-delay: -31s;
  transform-origin: 14vw 7vh;
  box-shadow: 2vmin 0 0.6973197653997685vmin currentColor;
}
.background span:nth-child(27) {
  color: #ffacac;
  top: 14%;
  left: 95%;
  animation-duration: 38s;
  animation-delay: -45s;
  transform-origin: 0vw 5vh;
  box-shadow: 2vmin 0 0.8369600147599718vmin currentColor;
}
.background span:nth-child(28) {
  color: #583c87;
  top: 95%;
  left: 37%;
  animation-duration: 47s;
  animation-delay: -36s;
  transform-origin: 4vw 14vh;
  box-shadow: -2vmin 0 1.028623887758939vmin currentColor;
}
.background span:nth-child(29) {
  color: #ffacac;
  top: 2%;
  left: 36%;
  animation-duration: 18s;
  animation-delay: -8s;
  transform-origin: 5vw 20vh;
  box-shadow: -2vmin 0 0.6141088196848541vmin currentColor;
}
.background span:nth-child(30) {
  color: #e45a84;
  top: 41%;
  left: 5%;
  animation-duration: 44s;
  animation-delay: -21s;
  transform-origin: 22vw 13vh;
  box-shadow: 2vmin 0 0.7866790125955858vmin currentColor;
}
.background span:nth-child(31) {
  color: #e45a84;
  top: 55%;
  left: 72%;
  animation-duration: 50s;
  animation-delay: -43s;
  transform-origin: 12vw -7vh;
  box-shadow: 2vmin 0 1.1974636392986908vmin currentColor;
}
.background span:nth-child(32) {
  color: #e45a84;
  top: 57%;
  left: 12%;
  animation-duration: 18s;
  animation-delay: -6s;
  transform-origin: -22vw -8vh;
  box-shadow: -2vmin 0 1.1466611289195296vmin currentColor;
}
.background span:nth-child(33) {
  color: #ffacac;
  top: 54%;
  left: 92%;
  animation-duration: 45s;
  animation-delay: -22s;
  transform-origin: 13vw 24vh;
  box-shadow: 2vmin 0 0.5643715141993626vmin currentColor;
}
.background span:nth-child(34) {
  color: #ffacac;
  top: 67%;
  left: 82%;
  animation-duration: 20s;
  animation-delay: -45s;
  transform-origin: -8vw -8vh;
  box-shadow: 2vmin 0 0.2618759886382718vmin currentColor;
}
.background span:nth-child(35) {
  color: #583c87;
  top: 33%;
  left: 26%;
  animation-duration: 20s;
  animation-delay: -13s;
  transform-origin: -13vw 20vh;
  box-shadow: -2vmin 0 1.2414264862526099vmin currentColor;
}
.background span:nth-child(36) {
  color: #ffacac;
  top: 44%;
  left: 88%;
  animation-duration: 7s;
  animation-delay: -47s;
  transform-origin: 1vw -1vh;
  box-shadow: 2vmin 0 1.123726506834915vmin currentColor;
}
.background span:nth-child(37) {
  color: #e45a84;
  top: 19%;
  left: 66%;
  animation-duration: 25s;
  animation-delay: -35s;
  transform-origin: -8vw -10vh;
  box-shadow: -2vmin 0 0.9908462333233248vmin currentColor;
}
.background span:nth-child(38) {
  color: #e45a84;
  top: 4%;
  left: 28%;
  animation-duration: 42s;
  animation-delay: -39s;
  transform-origin: 21vw -4vh;
  box-shadow: -2vmin 0 1.1363159921622812vmin currentColor;
}
.background span:nth-child(39) {
  color: #583c87;
  top: 98%;
  left: 96%;
  animation-duration: 6s;
  animation-delay: -4s;
  transform-origin: -9vw 6vh;
  box-shadow: -2vmin 0 1.0823173524665868vmin currentColor;
}
.background span:nth-child(40) {
  color: #ffacac;
  top: 28%;
  left: 20%;
  animation-duration: 30s;
  animation-delay: -27s;
  transform-origin: -19vw 12vh;
  box-shadow: -2vmin 0 0.2850067218751198vmin currentColor;
}
.background span:nth-child(41) {
  color: #583c87;
  top: 36%;
  left: 55%;
  animation-duration: 35s;
  animation-delay: -39s;
  transform-origin: -7vw 23vh;
  box-shadow: -2vmin 0 1.0178395953266783vmin currentColor;
}
.background span:nth-child(42) {
  color: #e45a84;
  top: 56%;
  left: 56%;
  animation-duration: 23s;
  animation-delay: -37s;
  transform-origin: 22vw 25vh;
  box-shadow: -2vmin 0 0.4115368393528993vmin currentColor;
}
.background span:nth-child(43) {
  color: #e45a84;
  top: 91%;
  left: 51%;
  animation-duration: 50s;
  animation-delay: -12s;
  transform-origin: -8vw -21vh;
  box-shadow: -2vmin 0 0.28783706489281746vmin currentColor;
}
.background span:nth-child(44) {
  color: #ffacac;
  top: 48%;
  left: 42%;
  animation-duration: 22s;
  animation-delay: -38s;
  transform-origin: -11vw 3vh;
  box-shadow: -2vmin 0 0.3209515641472851vmin currentColor;
}
.background span:nth-child(45) {
  color: #e45a84;
  top: 33%;
  left: 71%;
  animation-duration: 55s;
  animation-delay: -20s;
  transform-origin: 15vw -12vh;
  box-shadow: 2vmin 0 0.6412767096667926vmin currentColor;
}
.background span:nth-child(46) {
  color: #ffacac;
  top: 20%;
  left: 41%;
  animation-duration: 13s;
  animation-delay: -36s;
  transform-origin: -9vw -13vh;
  box-shadow: 2vmin 0 0.8286551092384511vmin currentColor;
}
.background span:nth-child(47) {
  color: #ffacac;
  top: 52%;
  left: 45%;
  animation-duration: 32s;
  animation-delay: -16s;
  transform-origin: 13vw -23vh;
  box-shadow: -2vmin 0 1.1454209524136698vmin currentColor;
}
.background span:nth-child(48) {
  color: #e45a84;
  top: 100%;
  left: 90%;
  animation-duration: 32s;
  animation-delay: -33s;
  transform-origin: -18vw 21vh;
  box-shadow: -2vmin 0 0.6499780281360461vmin currentColor;
}
.background span:nth-child(49) {
  color: #e45a84;
  top: 40%;
  left: 94%;
  animation-duration: 9s;
  animation-delay: -33s;
  transform-origin: -19vw -13vh;
  box-shadow: -2vmin 0 1.0374084615501356vmin currentColor;
}
</style>