<script>
  import { goto } from "$app/navigation";
</script>

<div class="welcomeMain1">
  <div class="welcomeImg img1" style="height: 1705px;" />
  <div style="position: relative;">
    <div class="welcomeImg img2" style="height: 173px;" />
    <button class="joinButton" on:click={() => goto("/login/awJoin")}></button>
  </div>
</div>
<div class="welcomeMain2">
  <div class="welcomeImg img3" style="height: 741px;" />
</div>
<div class="welcomeMain3">
  <div class="welcomeImg img4" style="height: 1251px;" />
</div>
<div class="welcomeMain2">
  <div class="welcomeImg img5" style="height: 594px;" />
</div>
<div class="welcomeMain3">
  <div class="welcomeImg img6" style="height: 839px;" />
</div>
<div class="welcomeMain2">
  <div style="position: relative;">
    <div class="welcomeImg img7" style="height: 322px;" />
    <button class="joinButton2" on:click={() => goto("/login/awJoin")}></button>
  </div>
</div>

<style>
  .welcomeMain1 {
    background-color: #12a9a7;
  }
  .welcomeMain2 {
    background-color: #ffffff;
  }
  .welcomeMain3 {
    background-color: #f4f4f4;
  }
  .welcomeImg {
    display: block;
    margin: 0 auto;
    width: 900px;
  }

  .welcomeImg.img1 {
    background-image: url(../../assets/img/welcome_01.png);
  }
  .welcomeImg.img2 {
    background-image: url(../../assets/img/welcome_02.png);
  }
  .welcomeImg.img3 {
    background-image: url(../../assets/img/welcome_03.png);
  }
  .welcomeImg.img4 {
    background-image: url(../../assets/img/welcome_04.png);
  }
  .welcomeImg.img5 {
    background-image: url(../../assets/img/welcome_05.png);
  }
  .welcomeImg.img6 {
    background-image: url(../../assets/img/welcome_06.png);
  }
  .welcomeImg.img7 {
    background-image: url(../../assets/img/welcome_07.png);
  }

  .joinButton {
    position: absolute;
    top: 24px;
    left: 50%;
    margin-left: -202px;
    width: 405px;
    height: 85px;
  }
  .joinButton2 {
    position: absolute;
    top: 60px;
    left: 50%;
    margin-left: -202px;
    width: 405px;
    height: 80px;
  }
</style>
