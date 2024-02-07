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
    const $open = 'mht-nav-open';
    const $fade = 'mht-nav-fade';

    var closeMenu = () => {
        if( $menuToggler.getAttribute( 'aria-expanded' ) === 'true' ){
            $menuToggler.setAttribute( 'aria-expanded', 'false' );
            Array.prototype.forEach.call( $menuToggles, ( $toggle, i ) => {
                $toggle.classList.remove( $open, $fade );
            });
        }
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
    $menuToggler.addEventListener( 'click', (e) => {
        let $this = e.target;
        if( $this.getAttribute( 'aria-expanded' ) != 'true' ){ /// if hamburger is open
            $this.setAttribute( 'aria-expanded', 'true' );
            Array.prototype.forEach.call( $menuToggles, function( $toggle, i ){
                $toggle.classList.add( $open );
                setTimeout( () => { $toggle.classList.add( $fade ); }, 1 );
            });
		} else {
			closeMenu();
		}
    } );
    $menuToggler.addEventListener( 'keydown', checkKey );
    $siteNavigation.addEventListener( 'keydown', checkKey );
    /// window event
    window.addEventListener( "resize", updateWindowSize );

    updateWindowSize();

}() );