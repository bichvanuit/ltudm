$(document).ready(function () {
	let url_api = "http://103.232.120.91:1337";
	new WOW().init();
	gapi.load('client:auth2', function () { });
	(function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	window.fbAsyncInit = function () {
		FB.init({
			appId: '311527799575459',
			cookie: true,  // enable cookies to allow the server to access 
			// the session
			xfbml: true,  // parse social plugins on this page
			version: 'v3.1' // use graph api version 2.8
		});
	}

	$(".back-to-top").click(function () {
		$('html,body').animate({
			scrollTop: 0
		}, 700);
	});


	var owl = $("#owl-demo");

	owl.owlCarousel({
		items: 5,
		loop: true,
		margin: 10,
		autoplay: true,
		autoplayTimeout: 1000,
		autoplayHoverPause: true,
		nav: true,
		navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
	});

	owl.trigger('play.owl.autoplay', [1000])

	$(document).on("change", ".province", function () {
		$.ajax({
			url: url_api + "/location/get-location",
			type: "GET",
			data: {
				province_id: $(this).val(),
			},
			success: function (result) {
				var data = result.value, html = '';
				for (var i in data) {
					html += `<option value="${data[i].district_id}">${data[i].district_name}</option>`
				}
				$(".district").html(html);
				$(".district").trigger("change");
			}
		});
	});

	$(document).on("change", ".district", function () {
		$.ajax({
			url: url_api + "/location/get-location",
			type: "GET",
			data: {
				district_id: $(this).val(),
				province_id: $(".province").val(),
			},
			success: function (result) {
				var data = result.value, html = '';
				for (var i in data) {
					html += `<option value="${data[i].id}">${data[i].commune_name}</option>`
				}
				$(".commune").html(html);
			}
		});
	});

	$(".customer").click(function () {
		$('#account').toggle();
	});

	$('#checkCart').hover(
		function () { },
		function () {
			$(this).collapse('hide');
		}
	);

	$('#account, #add-to-cart, #menu').hover(
		function () { },
		function () {
			$(this).hide();
		}
	);

	$(".main-menu").hover(function () {
		$("#menu").show();
	});

	$(document).on("click", "input[type=checkbox]", function () {
		$("#change-password").collapse('toggle');
	});

	$(document).on("keyup", "input[name=filter]", function () {
		let value = $(this).val().toLowerCase();
		$('[data-item="' + $(this).attr("data-target") + '"]').each(function () {
			if ($(this).text().toLowerCase().indexOf(value) > -1) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
	});

	$(document).on("click", ".btn-facebook", function () {
		FB.login(function (response) {
			if (response.status == "connected") {
				$.ajax({
					url: url_api + "/customer/login-with-facebook",
					type: "POST",
					data: {
						access_token: response.authResponse.accessToken,
					},
					beforeSend: function () {
						$("#loading").show();
					},
					success: function (result) {
						if (result.status) {
							window.localStorage.clear();
							localStorage.setItem("MW_TOKEN", result.value);
							location.reload();
						} else {
							swal(
								'Xảy ra lỗi',
								'Vui lòng thử lại',
								'error'
							)
						}
					}
				});
			}
		});
	});

	$(document).on("click", ".btn-google", function () {
		var auth2 = gapi.auth2.init({
			client_id: '643174772666-6vk6m4qiu19adj5fe728qmg933fc4b1m.apps.googleusercontent.com',
			fetch_basic_profile: true,
			scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
		});
		auth2.signIn()
			.then(function () {
				let GoogleAuth = gapi.auth2.getAuthInstance();
				let user = GoogleAuth.currentUser.get();
				if (user.El != null) {
					$.ajax({
						url: url_api + "/customer/login-with-google",
						type: "POST",
						data: {
							access_token: user.Zi.access_token,
						},
						beforeSend: function () {
							$("#loading").show();
						},
						success: function (result) {
							if (result.status) {
								window.localStorage.clear();
								localStorage.setItem("MW_TOKEN", result.value);
								location.reload();
							} else {
								swal(
									'Xảy ra lỗi',
									'Vui lòng thử lại',
									'error'
								)
							}
						}
					});
				}
			})
			.catch(function (err) { });
	});


	$(document).on("click", ".btn-login", function () {
		$.ajax({
			url: url_api + "/customer/login",
			type: "POST",
			data: {
				username: $(".login input[name=username]").val(),
				password: $(".login input[name=password]").val(),
			},
			success: function (result) {
				if (result.status) {
					window.localStorage.clear();
					localStorage.setItem("MW_TOKEN", result.value.token);
					location.reload();
				} else {
					$('.error-login').text(result.message);
				}
			}
		});
	});

	$(document).on("click", ".logout", function () {
		localStorage.removeItem("MW_TOKEN");
		location.reload();
	});

	$(document).on("click", ".favorite-product", function () {
		if(localStorage.getItem("MW_TOKEN") == null) {
			$("#authModal").modal();
		} 
	});	

	$(document).on("click", ".btn-add-to-cart", function () {
		if (localStorage.getItem("MW_TOKEN")) {
			$.ajax({
				url: url_api + "/customer/add-to-cart",
				type: "POST",
				data: {
					data: {
						"product_id": $(this).attr("data-id"),
						"category_id": $(this).attr("data-category"),
						"amount": $("input[name=numProduct]").val(),
					}
				},
				headers: {
					"authorization": "Bearer " + localStorage.getItem("MW_TOKEN"),
				},
				success: function (result) {
					$(".back-to-top").trigger('click');
					$("#add-to-cart").show();
					$(".cart-count").text(+$(".cart-count").text() + +$("input[name=numProduct]").val());
				}
			});
		} else {
			$("#authModal").modal();
		}
	});

	$(document).on("click", ".btn-register", function () {
		$.ajax({
			url: url_api + "/customer/register",
			type: "POST",
			data: {
				username: $(".register input[name=username]").val(),
				password: $(".register input[name=password]").val(),
				confirm: $(".register input[name=confirm]").val(),
			},
			success: function (result) {
				if (result.status) {
					$('.error-register').text("Kiểm tra mail để kích hoạt tài khoản");
				} else {
					$('.error-register').text(result.message);
				}
			}
		});
	});

	$(document).on("click", ".btn-minute", function () {
		let value = $(".cart-count").text();
		if (value > 1) {
			$(".cart-count").text(value - 1);
		}
	});

	$(document).on("click", ".btn-plus", function () {
		let value = $(".cart-count").text();
		$(".cart-count").text(+value + 1);
	});

	let ratingValue = 0;
	$(document).on('mouseover', '#stars li', function () {
		var onStar = parseInt($(this).data('value'), 10);
		$(this).parent().children('li.star').each(function (e) {
			if (e < onStar) {
				$(this).addClass('hover');
			}
			else {
				$(this).removeClass('hover');
			}
		});
	});
	$(document).on('mouseout', '#stars li', function () {
		$(this).parent().children('li.star').each(function (e) {
			$(this).removeClass('hover');
		});
	});

	$(document).on('click', '#stars li', function () {
		var onStar = parseInt($(this).data('value'), 10);
		var stars = $(this).parent().children('li.star');
		for (i = 0; i < stars.length; i++) {
			$(stars[i]).removeClass('selected');
		}

		for (i = 0; i < onStar; i++) {
			$(stars[i]).addClass('selected');
		}

		ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
	});
	$(document).on('click', '.btn-send', function () {
		console.log($("input[name=product_id]").val());
		if (ratingValue == 0) {
			$(".status p").html('<i class="fa fa-times" aria-hidden="true"></i> Bạn chưa đánh giá sản phẩm');
		} else if ($("#comment").val() == "") {
			$(".status p").html('<i class="fa fa-times" aria-hidden="true"></i> Bạn chưa nhập nhận xét');
		} else {
			$.ajax({
				url: url_api + "/evaluate/post-evaluate",
				type: "POST",
				data: {
					data: {
						"star": ratingValue,
						"comment": $("#comment").val(),
						"product_id" : $("input[name=product_id]").val(),
						"category_id" : $("input[name=category_id]").val(),
					}
				},
				headers: {
					"authorization": "Bearer " + localStorage.getItem("MW_TOKEN"),
				},
				success: function (result) {
					console.log(result);
					if (result.status) {
						$(".status").removeClass("alert-danger");
						$(".status").addClass("alert-success");
						$(".status p").html('<i class="fa fa-check" aria-hidden="true"></i> Cảm ơn bạn đã đánh giá sản phẩm của chúng tôi');
					} else {
						$(".status p").html('<i class="fa fa-times" aria-hidden="true"></i> Bạn đã nhận xét sản phẩm này');
					}

				}
			});
		}
		$(".status").show();
	});
});

