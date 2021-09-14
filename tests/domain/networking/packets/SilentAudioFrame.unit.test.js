//
//  SilentAudioFrame.unit.test.js
//
//  Created by David Rowe on 11 Sep 2021.
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

import NLPacket from "../../../../src/domain/networking/NLPacket";
import SilentAudioFrame from "../../../../src/domain/networking/packets/SilentAudioFrame";
import PacketType from "../../../../src/domain/networking/udt/PacketHeaders";
import UDT from "../../../../src/domain/networking/udt/UDT";

import { buffer2hex } from "../../../testUtils.js";


describe("SilentAudioFrame - unit tests", () => {

    /* eslint-disable @typescript-eslint/no-magic-numbers */

    test("Can write a SilentAudioFrame packet", () => {
        // eslint-disable-next-line max-len
        const EXPECTED_PACKET = "000000000c180000000000000000000000000000000000001700040000006f707573f0009a99993f9a9959403333b340cdcc4c3e9a99993e0000003fcdcccc3d0000c84200004843000096430000003f0000003f00000040";

        const packet = SilentAudioFrame.write({
            sequenceNumber: 23,
            codecName: "opus",
            isStereo: false,
            audioPosition: { x: 1.2, y: 3.4, z: 5.6 },
            audioOrientation: { x: 0.2, y: 0.3, z: 0.5, w: 0.1 },
            avatarBoundingBoxCorner: { x: 100.0, y: 200.0, z: 300.0 },
            avatarBoundingBoxScale: { x: 0.5, y: 0.5, z: 2.0 }
        });

        expect(packet instanceof NLPacket).toBe(true);
        expect(packet.getType()).toBe(PacketType.SilentAudioFrame);
        const packetSize = packet.getDataSize();
        expect(packetSize).toBe(packet.getMessageData().dataPosition);
        expect(packetSize).toBeGreaterThan(0);
        expect(packetSize).toBeLessThan(UDT.MAX_PACKET_SIZE);

        expect(packetSize).toBe(EXPECTED_PACKET.length / 2);
        expect(buffer2hex(packet.getMessageData().buffer.slice(0, packetSize))).toBe(EXPECTED_PACKET);
    });

});
