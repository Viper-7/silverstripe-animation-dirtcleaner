<% if not $SiteConfig.DisableBackground %>
    <script type="text/javascript">
        window.pixiconf = {};
        window.pixiconf.InitialDirt = $SiteConfig.InitialDirt;
        window.pixiconf.DirtyRate = $SiteConfig.DirtyRate / 100;
        window.pixiconf.CharacterSize = $SiteConfig.CharacterSize;
        window.pixiconf.CharacterSpeed = $SiteConfig.CharacterSpeed;
    </script>
    <div id="pixi-container" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"></div>
<% end_if %>