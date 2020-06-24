import Mediator from './mediator';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
require('bootstrap/js/tab.js');

const	$body = $('body');
const	$hamburger = $('.hamburger');
const	$mobileMenu = $('.mobile-menu');
const	$mobileNav = $('.mobile-menu a');
const	$footerNav = $('.footer-links a');
const	$login = $('.login');
const	$loginClose = $('.login__close');
const 	$tabsNav = $('.tabs li');

$(() => {
	svg4everybody();

	$hamburger.click(function () {
		Mediator.publish('menuChange');
	});

	$mobileNav.click(function (e) {
		const href = $(e.target).attr('href');

		if (href === '#login') {
			e.preventDefault();
			Mediator.publish('loginChange');
			if (Mediator.menu) {
				Mediator.publish('menuChange');
			}
		}
	});

	$footerNav.click(function (e) {
		const href = $(e.target).attr('href');

		if (href === '#login') {
			e.preventDefault();
			window.scrollTo(0, 0);
			Mediator.publish('loginChange');
		}
	});


	$loginClose.click(function () {
		Mediator.publish('loginChange');
	});


	$tabsNav.click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
});

Mediator.subscribe('menuChange', function () {
	if (!this.menu && !this.login) {
		$body.addClass('overflowed');
		$mobileMenu.addClass('is-open');
		$hamburger.addClass('is-active');
		this.menu = true;
	}else if (this.menu && !this.login) {
		$body.removeClass('overflowed');
		$mobileMenu.removeClass('is-open');
		$hamburger.removeClass('is-active');
		this.menu = false;
	}else if (!this.menu && this.login) {
		this.menu = true;
		$mobileMenu.addClass('is-open');
		$hamburger.addClass('is-active');
	}else if (this.menu && this.login) {
		$mobileMenu.removeClass('is-open');
		$hamburger.removeClass('is-active');
		this.menu = false;
	}
});

Mediator.subscribe('loginChange', function () {
	if (!this.login) {
		$body.addClass('overflowed');
		$login.addClass('is-open');
		$hamburger.addClass('dark');
		this.login = true;
	}else if (this.login && this.menu) {
		return false;
	}else {
		$body.removeClass('overflowed');
		$login.removeClass('is-open');
		$hamburger.removeClass('dark');
		this.login = false;
	}
});
