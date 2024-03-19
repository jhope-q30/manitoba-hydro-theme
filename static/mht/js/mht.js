( function(){

    console.log( "Navigation js loaded" );

    const $siteNavigation = document.getElementById( 'navigation' );

    if ( ! $siteNavigation ) { return; }

    const $content = document.getElementById( 'content' );
    const $menuLogo = document.getElementById( 'header-logo' );
    const $menuToggler = document.getElementById( 'toggler' );
    const $menuToggles = document.querySelectorAll( '.mht-nav-toggle' );
    const $primaryMenu = document.getElementById( 'primary-menu' );
    const $primaryMenuItems = $primaryMenu.querySelectorAll( '.mht-menu-item' );
    const $primaryMenuButtons = $primaryMenu.getElementsByTagName( 'button' );
    const $primaryMenuLinks = $primaryMenu.getElementsByTagName( 'a' );
    const $navOpen = 'mht-nav-open';
    const $navFade = 'mht-nav-fade';
    const $menuOpen = 'mht-menu-open';
    const $menuFade = 'mht-menu-fade';

    var closeNav = () => {
        if( $menuToggler.getAttribute( 'aria-expanded' ) === 'true' ){
            $menuToggler.setAttribute( 'aria-expanded', 'false' );
            Array.prototype.forEach.call( $menuToggles, ( $toggle, i ) => {
                $toggle.classList.remove( $navOpen, $navFade );
            });
        }
    }
    var clearMenus = () => {
        Array.prototype.forEach.call( $primaryMenuButtons, ( $button, i ) => {
            const $parent = document.getElementById( $button.getAttribute( 'aria-controls' ) );
            $parent.setAttribute( 'aria-hidden', 'true' );
			$parent.classList.remove( $menuOpen, $menuFade );
			$button.setAttribute( 'aria-expanded', 'false' );
		});
    }
    var checkKeyCloseNav = (e) => {
        if( e.key == "Escape" ){
            closeNav();
        }
    }
    var checkKeyClearMenus = (e) => {
        if( e.key == "Escape" ){
            clearMenus();
        }
    }
    var checkLastMenuItem = () => {
        const $screen = window.matchMedia( "( max-width: 992px )" ).matches ? "small" : "large";
        Array.prototype.forEach.call( $primaryMenuItems, ( $item, i ) => {
            const $ul = $item.getElementsByTagName( 'ul' );
            if( $ul.length ){
                if( $screen == "large" ){
                    const $offsetLeft = ( $item.offsetLeft + $ul.item(0).offsetWidth ) - window.innerWidth;
                    $ul.item(0).style.left = $offsetLeft > 0 ? ( 0 - $offsetLeft ) + "px" : 0;
                } else {
                    $ul.item(0).style.left = 0;
                }
            }
        });
    }
    var checkInSiteNavigation = (e) => {
        if( ! $siteNavigation.contains( e.relatedTarget ) ){
            clearMenus();
        }
    }
    var updateWindowSize = () => {
        checkLastMenuItem();
    }
    /** navigation toggles */
    $menuToggler.addEventListener( 'click', (e) => {
        if( $menuToggler.getAttribute( 'aria-expanded' ) != 'true' ){ /// if hamburger is open
            $menuToggler.setAttribute( 'aria-expanded', 'true' );
            Array.prototype.forEach.call( $menuToggles, ( $toggle, i ) => {
                $toggle.classList.add( $navOpen );
                setTimeout( () => { $toggle.classList.add( $navFade ); }, 1 );
            });
		} else {
			closeNav();
		}
    } );
    $menuToggler.addEventListener( 'keydown', checkKeyCloseNav );
    $siteNavigation.addEventListener( 'keydown', checkKeyCloseNav );
    $siteNavigation.addEventListener( 'focusout', checkInSiteNavigation );
    /// window resize event
    window.addEventListener( "resize", updateWindowSize );
    Array.prototype.forEach.call( $primaryMenuButtons, ( $button, i ) => {
        $button.addEventListener( 'click', (e) => {
            const $parent = document.getElementById( $button.getAttribute( 'aria-controls' ) );
            if( $button.getAttribute( 'aria-expanded' ) != 'true' ){
                clearMenus(); /// clear open navigation
                $button.setAttribute( 'aria-expanded', 'true' );
                $parent.classList.add( $menuOpen );
                $parent.setAttribute( 'aria-hidden', 'false' );
                checkLastMenuItem();
                setTimeout( () => { $parent.classList.add( $menuFade ); }, 2 );
		    } else {
                clearMenus(); /// clear open navigation
            }
        } );
        $button.addEventListener( 'keydown', checkKeyClearMenus );
    }, true );
    Array.prototype.forEach.call( $primaryMenuLinks, ( $link, i ) => {
        $link.addEventListener( 'keydown', checkKeyClearMenus );
    }, true );

    updateWindowSize();

}() );