from PIL import Image, ImageDraw, ImageFont

# ─── CONFIG ───────────────────────────────────────────────────────────────────
W, H = 1600, 628

BG        = (10, 10, 10)        # #0A0A0A
WHITE     = (255, 255, 255)
OFF_WHITE = (220, 220, 220)
DIM       = (110, 110, 110)
GRAY      = (160, 160, 160)
ORANGE    = (249, 115, 22)      # #F97316
GREEN     = (74, 222, 128)      # bright green for allowed lines

FONT_BOLD   = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG    = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_MONO   = "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf"
FONT_MONO_R = "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf"

# ─── HELPERS ──────────────────────────────────────────────────────────────────

def dashed_line(draw, p0, p1, color, dash=10, gap=6, width=1):
    """Draw a dashed line from p0 to p1."""
    x0, y0 = p0
    x1, y1 = p1
    dx, dy = x1 - x0, y1 - y0
    length = (dx**2 + dy**2) ** 0.5
    if length == 0:
        return
    ux, uy = dx / length, dy / length
    pos = 0
    drawing = True
    while pos < length:
        seg = dash if drawing else gap
        end = min(pos + seg, length)
        if drawing:
            sx, sy = x0 + ux * pos,  y0 + uy * pos
            ex, ey = x0 + ux * end,  y0 + uy * end
            draw.line([(sx, sy), (ex, ey)], fill=color, width=width)
        pos = end
        drawing = not drawing


def dashed_rect(draw, x0, y0, x1, y1, color, dash=10, gap=6, width=1):
    dashed_line(draw, (x0, y0), (x1, y0), color, dash, gap, width)  # top
    dashed_line(draw, (x1, y0), (x1, y1), color, dash, gap, width)  # right
    dashed_line(draw, (x1, y1), (x0, y1), color, dash, gap, width)  # bottom
    dashed_line(draw, (x0, y1), (x0, y0), color, dash, gap, width)  # left


# ─── CREATE CANVAS ────────────────────────────────────────────────────────────
img  = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# ─── OUTER DASHED BORDER ──────────────────────────────────────────────────────
B = 20  # border inset
dashed_rect(draw, B, B, W - B, H - B, WHITE, dash=12, gap=7, width=2)

# ─── TICK MARKS (top + bottom) ────────────────────────────────────────────────
TICK_STEP   = 55
TICK_H_IN   = 10   # inner ticks (pointing inward)
TICK_H_OUT  = 4    # outer tiny ticks

for x in range(B, W - B + 1, TICK_STEP):
    # Top border
    draw.line([(x, B - TICK_H_OUT), (x, B + TICK_H_IN)], fill=WHITE, width=1)
    # Bottom border
    draw.line([(x, H - B + TICK_H_OUT), (x, H - B - TICK_H_IN)], fill=WHITE, width=1)

# Tick marks on left + right edges too (shorter)
TICK_SIDE_STEP = 55
for y in range(B, H - B + 1, TICK_SIDE_STEP):
    draw.line([(B - 3, y), (B + 6, y)], fill=DIM, width=1)
    draw.line([(W - B + 3, y), (W - B - 6, y)], fill=DIM, width=1)

# ─── FONTS ────────────────────────────────────────────────────────────────────
f_label   = ImageFont.truetype(FONT_BOLD, 17)
f_pill    = ImageFont.truetype(FONT_BOLD, 13)
f_headline= ImageFont.truetype(FONT_BOLD, 112)
f_mono    = ImageFont.truetype(FONT_MONO, 16)
f_mono_sm = ImageFont.truetype(FONT_MONO, 14)

# ─── LEFT SIDE ────────────────────────────────────────────────────────────────
LX = 65  # left content X

# "OPENSIGIL" label  (small, orange, uppercase)
draw.text((LX, 54), "OPENSIGIL", font=f_label, fill=ORANGE)

# "OPEN SOURCE" pill badge
PILL_Y   = 88
pill_txt = "OPEN SOURCE"
pb       = draw.textbbox((0, 0), pill_txt, font=f_pill)
pw, ph   = pb[2] - pb[0], pb[3] - pb[1]
PPX, PPY = 14, 6
pill_w   = pw + PPX * 2
pill_h   = ph + PPY * 2
pill_r   = pill_h // 2
draw.rounded_rectangle(
    [LX, PILL_Y, LX + pill_w, PILL_Y + pill_h],
    radius=pill_r, outline=ORANGE, width=1
)
draw.text((LX + PPX, PILL_Y + PPY - 1), pill_txt, font=f_pill, fill=ORANGE)

# Large headline — 3 lines
HL_Y      = 136
HL_STEP   = 116
HL_LINES  = ["GOVERN", "AGENTS IN", "PRODUCTION"]

for i, line in enumerate(HL_LINES):
    y = HL_Y + i * HL_STEP
    draw.text((LX, y), line, font=f_headline, fill=WHITE)

# Subtle vertical divider between left and right panels
DIV_X = int(W * 0.585)
dashed_line(draw, (DIV_X, B + 12), (DIV_X, H - B - 12), (50, 50, 50), dash=6, gap=8, width=1)

# ─── RIGHT SIDE — TERMINAL BOX ────────────────────────────────────────────────
TX0 = DIV_X + 32
TY0 = B + 38
TX1 = W - B - 28
TY1 = H - B - 38

dashed_rect(draw, TX0, TY0, TX1, TY1, (190, 190, 190), dash=8, gap=5, width=1)

# Corner accent squares
SZ = 5
for cx, cy in [(TX0, TY0), (TX1, TY0), (TX0, TY1), (TX1, TY1)]:
    draw.rectangle([cx - SZ, cy - SZ, cx + SZ, cy + SZ], fill=WHITE)

# Terminal content
# We draw line by line; some lines have a mixed-color rendering
IX  = TX0 + 22
IY  = TY0 + 20
LH  = 22   # line height

# Define terminal lines as list of (text, color) tuples
# For lines with mixed colors, we'll handle them specially
T_LINES = [
    # (text, color, bold?)
    ("  ◉ DAEMON v0.1.0 — ACTIVE",             None,      True),   # special: ◉ orange, rest white
    ("  ─────────────────────────────",         DIM,       False),
    ("",                                         None,      False),
    ("  PID 4821  claude",                       GRAY,      True),
    ("  ├─ READ   src/index.ts      ✓",          GREEN,     False),
    ("  ├─ WRITE  src/output.ts     ✓",          GREEN,     False),
    ("  ├─ EXEC   npm install       ✓",          GREEN,     False),
    ("  └─ HTTP   api.anthropic.com ✓",          GREEN,     False),
    ("",                                         None,      False),
    ("  PID 5120  codex",                        GRAY,      True),
    ("  ├─ READ   package.json      ✓",          GREEN,     False),
    ("  ├─ EXEC   rm -rf /tmp    ⚠ BLOCKED",     ORANGE,    False),
    ("  └─ HTTP   unknown.io     ⚠ BLOCKED",     ORANGE,    False),
    ("",                                         None,      False),
    ("  sessions: 2  events: 8  violations: 2",  DIM,       False),
]

for i, (text, color, bold) in enumerate(T_LINES):
    y = IY + i * LH
    if y + LH > TY1 - 8:
        break
    if not text:
        continue

    font = f_mono if bold else f_mono_sm

    if color is None and text.startswith("  ◉"):
        # Special: render ◉ in orange, rest in white
        draw.text((IX, y), "  ", font=font, fill=WHITE)
        bb = draw.textbbox((IX, y), "  ", font=font)
        x_dot = bb[2]
        draw.text((x_dot, y), "◉", font=font, fill=ORANGE)
        bb2 = draw.textbbox((x_dot, y), "◉", font=font)
        x_rest = bb2[2]
        draw.text((x_rest, y), " DAEMON v0.1.0 — ACTIVE", font=font, fill=WHITE)
    else:
        draw.text((IX, y), text, font=font, fill=color or WHITE)

# ─── BOTTOM DECORATION ────────────────────────────────────────────────────────
# Small version/build tag at bottom right corner (inside main border)
f_tiny = ImageFont.truetype(FONT_MONO_R, 11)
draw.text((W - B - 180, H - B - 22), "v0.1.0 · opensigil.dev", font=f_tiny, fill=DIM)

# Small coordinate-style labels at top border corners (CRABTRAP aesthetic)
draw.text((B + 6, B + 6), "00,00", font=f_tiny, fill=DIM)
right_label = f"{W},{H}"
rb = draw.textbbox((0, 0), right_label, font=f_tiny)
draw.text((W - B - (rb[2]-rb[0]) - 6, B + 6), right_label, font=f_tiny, fill=DIM)

# ─── SAVE ─────────────────────────────────────────────────────────────────────
out = "/workspace/opensigil/banner.png"
img.save(out, "PNG", optimize=False)
print(f"✅ Saved → {out}")
print(f"   Size: {W}x{H}px")
