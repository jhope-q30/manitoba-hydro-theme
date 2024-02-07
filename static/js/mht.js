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
    const $navOpen = 'mht-nav-open';
    const $navFade = 'mht-nav-fade';
    const $menuOpen = 'mht-menu-open';
    const $menuFade = 'mht-menu-fade';

    var closeMenu = () => {
        if( $menuToggler.getAttribute( 'aria-expanded' ) === 'true' ){
            $menuToggler.setAttribute( 'aria-expanded', 'false' );
            Array.prototype.forEach.call( $menuToggles, ( $toggle, i ) => {
                $toggle.classList.remove( $navOpen, $navFade );
            });
        }
    }
    var clearNav = () => {
        Array.prototype.forEach.call( $primaryMenuButtons, ( $button, i ) => {
            const $parent = document.getElementById( $button.getAttribute( 'aria-controls' ) );
			$parent.classList.remove( $menuOpen, $menuFade );
			$button.setAttribute( 'aria-expanded', 'false' );
		});
    }
    var checkKey = (e) => {
        if( e.key == "Escape" ){
            closeMenu();
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
			closeMenu();
		}
    } );
    $menuToggler.addEventListener( 'keydown', checkKey );
    $siteNavigation.addEventListener( 'keydown', checkKey );
    /// window resize event
    window.addEventListener( "resize", updateWindowSize );
    Array.prototype.forEach.call( $primaryMenuButtons, ( $button, i ) => {
        $button.addEventListener( 'click', (e) => {
            const $parent = document.getElementById( $button.getAttribute( 'aria-controls' ) );
            if( $button.getAttribute( 'aria-expanded' ) != 'true' ){
                clearNav(); /// clear open navigation
                $button.setAttribute( 'aria-expanded', 'true' );
                $parent.classList.add( $menuOpen );
                setTimeout( () => { $parent.classList.add( $menuFade ); }, 2 );
		    } else {
                clearNav(); /// clear open navigation
            }
        } );
        ///$button.addEventListener( 'keydown', handleKeyPress, false );
    }, true );

    updateWindowSize();

}() );