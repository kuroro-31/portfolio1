<template>
<div v-cloak>
	<div id="calculator">
		<div class="screen-container">
			<div class="result">
				<transition name="slide-fade">
				<div class="number" :style="{fontSize : fontSize + 'px'}" v-if="tempResult !== ''"  v-cloak>{{ tempResult | number | hugeNumber }}</div>
				</transition>
			</div>
			<div class="calculation">
				<div class="number" v-cloak>{{ calculation | number | calculation}}</div>
			</div>
		</div>
		<div class="btn-container">
			<div class="oper-container">
					<div class="btn" id="clear" @click="clear()">
						<div class="number">AC</div>
					</div>
					<div class="btn operations divide" @click="append('/')">
						<div class="number">÷</div>
					</div>
					<div class="btn operations multiplication" @click="append('*')">
						<div class="number">×</div>
					</div>
					<div class="btn operations plus" @click="append('+')">
						<div class="number">+</div>
					</div>
					<div class="btn operations less" @click="append('-')">
						<div class="number">-</div>
					</div>
			</div>

			<div class="row">
				<div class="btn" @click="append('7')">
					<div class="number">7</div>
				</div>
				<div class="btn" @click="append('8')">
					<div class="number">8</div>
				</div>
				<div class="btn" @click="append('9')">
					<div class="number">9</div>
				</div>
			</div>
			<div class="row">
				<div class="btn" @click="append('4')">
					<div class="number">4</div>
				</div>
				<div class="btn" @click="append('5')">
					<div class="number">5</div>
				</div>
				<div class="btn" @click="append('6')">
					<div class="number">6</div>
				</div>
			</div>
			<div class="row">
				<div class="btn" @click="append('1')">
					<div class="number">1</div>
				</div>
				<div class="btn" @click="append('2')">
					<div class="number">2</div>
				</div>
				<div class="btn" @click="append('3')">
					<div class="number">3</div>
				</div>
			</div>
			<div class="row">
				<div class="btn" id="dot" @click="append('.')">
					<div class="number">.</div>
				</div>
				<div class="btn" @click="append('0')">
					<div class="number">0</div>
				</div>
								<div class="btn">
					<div class="number"></div>
				</div>
				<div class="btn" id="result" @click="getResult()">
					<div class="number">=</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import $ from "jquery";
window.$ = window.jQuery = require('jquery')

export default {
  name: 'Calculator',
  data() {
    return {
		calculation:'',
		tempResult:'',
    }
  },
  mounted: function () {
    $(document).ready(function () {
      // ==============================================================
      // ++、--など演算するときの記号が被った場合+,-と一つのものとして判断する処理
      // ==============================================================
      // String.prototype.replace()は、文字列を置換するメソッド
      String.prototype.replaceAll = function(search, replacement) {
          var target = this;

          // 「split()メソッド」と「join()メソッド」で置換を実現
          // 例えば、「2017/07/10」という日付を「2017-07-10」に変更したいとしましょう。
          // var str = '2017/07/10';
          // var result = str.split('/').join('-');
          // console.log(result);
          return target.split(search).join(replacement);
      };
      let btns = document.querySelectorAll('.btn')
      for (btn of btns) {
        btn.addEventListener('click',function() {
          this.classList.add('animate')
          this.classList.add('resetappearanim')
        })
        btn.addEventListener('animationend',function() {
          this.classList.remove('animate')
        })
      }
    });

  },
	// `methods` オブジェクトの下にメソッドを定義する
	methods: {
		append(value) {
			// toStringメソッドとは、「to（〜へ） + String（文字列）」、つまり「文字列へ変換」するときに使われるメソッド
			// JavaScriptでは、あらゆる値が数値、文字列、配列などのデータ型に分かれています。
			// toStringメソッドは、文字列でないものを文字列に変換するときに使われるメソッド
			this.calculation += value.toString()
		}
  },
	// 型: { [key: string]: string | Function | Object | Array
	// キーが監視する評価式で、値が対応するコールバックをもつオブジェクトです。
	// 値はメソッド名の文字列、または追加のオプションが含まれているオブジェクトを取ることができます。
	// Vue インスタンスはインスタンス化の際にオブジェクトの各エントリに対して $watch() を呼びます。
	watch: {
		calculation() {
			// isNaN()は値がNaNか否かを調べます。
			// etc) 0/0=NaN(Not a Number)
			if(this.calculation !== '' && !isNaN(this.calculation.slice(-1)) && this.calculation != this.result ){
				this.tempResult = this.result.toString()
			}
		}
  },
	// 算出プロパティ（computed）
	// メソッドとの違い下記参照
	// https://jp.vuejs.org/v2/guide/computed.html#%E7%AE%97%E5%87%BA%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3-vs-%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89
	computed: {
		result() {
			if(!isNaN(this.calculation.slice(-1)))
				// eval()とは、引数に指定した文字列をJavaScriptプログラムコードとして評価・実行する機能をもつ関数
				// eval関数の引数には文字列のみを指定することができます
				// ※calculationはtoString()メソッドで文字列に変換済み
				return eval(this.calculation)
			else
				// slice( 開始位置, 終了位置(省略可能) )
				return eval(this.calculation.slice(0, -1))
		},
		fontSize() {
			return this.fontSize = 50-(this.tempResult.length*1.25)
		}
  },
	// Vue.js では、一般的なテキストフォーマットを適用するために使用できるフィルタを定義できます。
	// フィルタは、mustache 展開と v-bind 式、2 つの場所で使用できます(後者は2.1.0以降でサポートされています)。
	// フィルタは JavaScript 式の末尾に追加する必要があります。これは “パイプ(‘|’)” 記号で表されます。
	filters: {
	  hugeNumber: (value) => {
		 let parts = value.toString().split(".");
		 parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		 return parts.join(".");
	  },
		number: (value) => {
			return value.replaceAll('*','x')
		},
		calculation: (value) => {
			return value.replaceAll('x',' x ').replaceAll('/',' / ').replaceAll('+',' + ').replaceAll('-',' - ')
		}
	}
}
</script>

<style lang="scss">
</style>
