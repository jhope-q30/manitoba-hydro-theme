( function(){

    console.log( "Navigation js loaded" );

    const $siteNavigation = document.getElementById( 'navigation' );

    if ( ! $siteNavigation ) {
		return;
	}

    const $content = document.getElementById( 'content' );
    const $menuLogo = document.getElementById( 'header-logo' );
    const $menuToggler = document.getElementById( 'toggler' );
    const $menuToggles = document.querySelectorAll( '.mht-nav-toggle' );
    const $primaryMenu = document.getElementById( 'primary-menu' );
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
    var updateWindowSize = () => {
        if( window.matchMedia( "( max-width: 992px )" ).matches ){
            $content.style.paddingTop = $menuLogo.offsetHeight + 'px';
        } else {
            $content.style.paddingTop = 0;
        }
    }
    /** navigation toggles */
    $menuToggler.addEventListener( 'click', (e) => {
        let $this = e.target;
        if( $this.getAttribute( 'aria-expanded' ) != 'true' ){ /// if hamburger is open
            $this.setAttribute( 'aria-expanded', 'true' );
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
                setTimeout( () => { $parent.classList.add( $menuFade ); }, 2 );
		    } else {
                clearMenus(); /// clear open navigation
            }
        } );
        
    }, true );
    Array.prototype.forEach.call( $primaryMenuLinks, ( $link, i ) => {
        $link.addEventListener( 'keydown', checkKeyClearMenus );
    }, true );

    updateWindowSize();

}() );