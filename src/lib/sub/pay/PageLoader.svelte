<script>
  // @ts-nocheck

  export let sectionClass = "location";
  import { base } from '$app/paths';
</script>
<style>
  /* Google Web Font */
  @import url("https://fonts.googleapis.com/css?family=Raleway&display=swap");

  section {
    line-height: 1.5em;
    margin: 0;
    font-weight: 300;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  a {
    text-decoration: none;
  }

  .loading {
  }
  .loading span {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: grey;
    border-radius: 50%;
    animation: loading 1s linear infinite;
  }

  .loading span:nth-child(1) {
    animation-delay: 0s;
    background-color: #dc3545;
  }
  .loading span:nth-child(2) {
    animation-delay: 0.2s;
    background-color: #c82333;
  }
  .loading span:nth-child(3) {
    animation-delay: 0.4s;
    background-color: #bd2130;
  }

  @keyframes loading {
    0%,
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  .logo-image {
    height: 80px;
    margin-bottom: 20px;
    animation: fadeIn 0.8s ease-in;
  }

  .loading-text {
    color: #2c3e50;
    font-size: 24px;
    font-weight: 700;
    margin: 10px 0 20px 0;
    animation: fadeIn 1s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .tex {
    text-align: center;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

<!--상단 바 Nav 부분-->
<!-- content S -->

<section class="z_alert" style="z-index: 0;">
  <div class="z_box_1">
    <div class="tex">
      <img src="{base}/assets/img/namwonLogo.png" alt="남원 E-케어" class="logo-image"/>
      
    </div>
    <div class="btn_wrap">
      <div class="loading" style="text-align: center;">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</section>
