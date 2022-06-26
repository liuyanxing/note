void main() {
 vec2 uv = gl_FragCoord.xy / iResolution.xy;
	gl_FragColor = vec4(uv.x, uv.y, 0, 1);
}